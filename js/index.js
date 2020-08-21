import { elements } from './modules/elements.js';
import * as googleMap from './modules/Map.js';
import * as planner from './modules/Planner.js';
import TripAdapter from './modules/tripAdapter.js';

const state = {};
const tripAdapter = new TripAdapter();

/*
****** Global Controller *******
*/

document.addEventListener('DOMContentLoaded', () => {
  showItem(elements.initModal);
  hideItem(elements.itineraryContainer);
  showItem(elements.initContentContainer);
  tripAdapter.fetchTrips();
})

document.addEventListener('click', e => {
  if(e.target.classList.contains('show-itineraries')) {
    showItem(elements.initModal);
    hideItem(elements.initContentContainer);
    showItem(elements.itineraryContainer);
  }
})

const hideItem = elem => {
  elem.style.display = 'none';
}

const showItem = elem => {
  elem.removeAttribute('style');
}

// Listen for place change in google searchbox
const searchBox = new google.maps.places.SearchBox(elements.cityInput);
searchBox.addListener('places_changed', () => {
  const city = searchBox.getPlaces()[0];
  if(city === null) return
  state.cityName = city.name;
  state.mapCenter = city.geometry.location;
})

/*
****** Init Modal Controller *******
*/

elements.initModal.addEventListener('click', e => {
  if(e.target.id === 'itinerary-back') {
    showItem(elements.initContentContainer);
    hideItem(elements.itineraryContainer);
  }
  e.preventDefault();
})

elements.searchSubmit.addEventListener('click', e => {
  controlInit(e);
  e.preventDefault();
})

const controlInit = e => {
  if (!state.mapCenter) {
    alert('Something went wrong. Select your destination again from the menu.');
  } else {
    planner.getDates();
    googleMap.initMap(state.mapCenter);

    // set selected types to all available types - google map api only supports place search one type at a time
    state.selectedTypes = Object.keys(googleMap.placeTypes);

    loadMapMarkersAndPlaces();

    // call weather forecast from API for destination and render weather info in daily planners
    planner.getWeather(state.mapCenter.lat(), state.mapCenter.lng());

    elements.initForm.reset();
    hideItem(elements.initModal);
  }
  e.preventDefault();
}

const loadMapMarkersAndPlaces = async () => {
  for (const type of state.selectedTypes) {
    const results = await googleMap.getPlaces(state.mapCenter, 8000, type);
    results.forEach(place => googleMap.savePlace(place, type));
    googleMap.addMarker(type);
    googleMap.showMarkers(type);
    googleMap.createCard(type);
  }
  googleMap.updatePlaceNumber(state.selectedTypes);
}

/*
****** Place Controller *******
*/

elements.placeContainer.addEventListener('click', e => {
  // when place container shows place overviews
  if(e.target.closest('.filter-buttons')) {
    selectPlaceFilters(e);
  } else if(e.target.closest('#filter-actions')) {
    applyFilterAction(e);

  // when place container shows place details and routes
  } else if(e.target.closest('.back')) {
    loadInitPage();
  } else if(e.target.closest('.heart')) {
    planner.addPlaceToPlanner();
  }
})

const selectPlaceFilters = e => {
  const filterLi = e.target.closest('.filter-li');
  if(filterLi) filterLi.childNodes[0].classList.toggle('selected');
}

const clearFilterSelection = () => {
  document.querySelectorAll('.selected').forEach(filter => filter.classList.remove('selected'));
}

const updateTypeSelection = () => {
  const selectedElems = Array.from(document.querySelectorAll('.selected'));
  if(selectedElems.length === 0) {
    state.selectedTypes = Object.keys(googleMap.placeTypes);
  } else {
    state.selectedTypes = selectedElems.map(element => element.parentNode.id);
  }
}

const applyFilterAction = e => {
  const applyAction = e.target.closest('#apply-filter');
  const clearAction = e.target.closest('#clear-filter');
  if(!applyAction && !clearAction) return;

  if(clearAction) {
    clearFilterSelection();
  }
  debugger
  updateTypeSelection();

  googleMap.clearMarkers();
  state.selectedTypes.forEach(type => googleMap.showMarkers(type));
  googleMap.clearCards();
  state.selectedTypes.forEach(type => googleMap.createCard(type));
  googleMap.updatePlaceNumber(state.selectedTypes);
  e.preventDefault();
}

const loadInitPage = () => {
  googleMap.removeItem(document.querySelector('.place-details'));
  googleMap.removeItem(document.querySelector('#directionsPanel'));
  showItem(document.querySelector('.place-overview'));

  googleMap.removeDirectionsRenderer();
  googleMap.clearMarkers();
  // googleMap.initMap(state.mapCenter);
  
  if(state.selectedTypes) {
    state.selectedTypes.forEach(type => googleMap.showMarkers(type));
  }

  // remove clicked style from all planner boxes in the planner section
  removeAllClickedStyle();
}

/*
****** Planner Controller *******
*/

elements.plannerContent.addEventListener('click', e => {
  // on place items
  if(e.target.classList.contains('delete')) {
    e.target.parentNode.parentNode.remove();
  } else if(e.target.classList.contains('duplicate')) {
    duplicateListItem(e);
  
  // on planner box
  } else if(e.target.closest('.planner-box')) {
    const selectedBox = e.target.closest('.planner-box');
    removeAllClickedStyle();
    addClickedStyle(selectedBox.querySelector('.title'));
    const placeIds = getPlaceIds(e);
    if(placeIds) googleMap.renderRoute(placeIds);

  // on planner action links
  } else if(e.target.closest('.save')) {
    const tripObj = createTripObj();
    // http post trip data to Rails backend
    tripAdapter.newTrip(tripObj);
  }
})

const duplicateListItem = e => {
  const itemNode = e.target.parentNode.parentNode;
  const clone = itemNode.cloneNode(true);
  itemNode.after(clone);
}

const addClickedStyle = elm => elm.classList.add('clicked');

const removeClickedStyle = elm => elm.classList.remove('clicked');

const removeAllClickedStyle = () => {
  Array.from(document.querySelectorAll('.title')).forEach(title => removeClickedStyle(title));
}

const getPlaceIds = e => {
  const titleElm = e.target.closest('.title');
  const itemElms = (titleElm.nextElementSibling.children ? [...titleElm.nextElementSibling.children] : null);
  if (!itemElms || itemElms.length < 2) return null;
  return itemElms.map(item => item.dataset.placeId);
}

// arrange triple nested data structure for HTTP post action
const createTripObj = () => {
  const days_attributes = [...document.querySelectorAll('.daily')].map(plannerBox => {
    const dateStr = plannerBox.querySelector('.date').innerText;
    const date = new Date(dateStr).toUTCString();

    const places_attributes = [...plannerBox.querySelectorAll('.list-item')].map(placeItem => {
      const name = placeItem.querySelector('.place-name').innerText;
      const place_id = placeItem.dataset.placeId;
      const category = placeItem.querySelector('.material-icons').innerText.split('_')[1];
      return {name, place_id, category};
    })

    return { date, places_attributes };
  })

  const city = state.cityName;
  const lat = state.mapCenter.lat();
  const lng = state.mapCenter.lng();

  return {
    trip: { city, lat, lng, days_attributes }
  };
}