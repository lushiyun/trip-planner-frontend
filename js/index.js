import { elements } from './modules/elements.js';
import * as googleMap from './modules/Map.js';
import * as planner from './modules/Planner.js';
import TripAdapter from './modules/tripAdapter.js';

const state = {};
const tripAdapter = new TripAdapter();

document.addEventListener('DOMContentLoaded', () => {
  hideItineraryContainer();
  showInitContentContainer();
  tripAdapter.fetchTrips();
})

// INIT FORM CONTROLLER
const searchBox = new google.maps.places.SearchBox(elements.cityInput);

searchBox.addListener('places_changed', () => {
  const city = searchBox.getPlaces()[0];
  if(city === null) return
  state.cityName = city.name;
  state.mapCenter = city.geometry.location;
})

document.querySelector('#search-submit').addEventListener('click', e => {
  e.preventDefault();
  controlInit(e);
})

document.addEventListener('click', e => {
  if(e.target.className === 'show-itineraries') {

    hideInitContentContainer();
    showItineraryContainer();
  }
})

elements.initModal.addEventListener('click', e => {
  if(e.target.id === 'show-itineraries') {
    hideInitContentContainer();
    showItineraryContainer();
  } else if(e.target.id === 'itinerary-back') {
    hideItineraryContainer();
    showInitContentContainer();
  }
  e.preventDefault();
})

const hideItem = elem => {
  elem.style.display = 'none';
}

const showItem = elem => {
  elem.removeAttribute('style');
}

const hideInitModal = () => {
  document.querySelector('#search-modal').style.display = 'none';
}

const showInitModal = () => {
  document.querySelector('#search-modal').removeAttribute('style');
}

const hideItineraryContainer = () => {
  document.querySelector('.itinerary-container').style.display = 'none';
}

const showItineraryContainer = () => {
  document.querySelector('.itinerary-container').removeAttribute('style');
}

const hideInitContentContainer = () => {
  document.querySelector('.init-content-container').style.display = 'none';
}

const showInitContentContainer = () => {
  document.querySelector('.init-content-container').removeAttribute('style');
}

const controlInit = e => {
  if (!state.mapCenter) {
    alert('Something went wrong');
  } else {
    planner.getDates();
    googleMap.initMap(state.mapCenter);
    state.selectedTypes = Object.keys(googleMap.placeTypes);
    loadMap();
    planner.getWeather(state.mapCenter.lat(), state.mapCenter.lng());
    elements.initForm.reset();
    elements.initModal.style.display = 'none';
  }
  e.preventDefault();
}

const loadMap = async () => {
  for (const type of state.selectedTypes) {
    const results = await googleMap.getPlaces(state.mapCenter, 8000, type);
    results.forEach(place => googleMap.savePlace(place, type))
    googleMap.addMarker(type);
    googleMap.showMarkers(type);
    googleMap.createCard(type);
  }
  googleMap.updatePlaceNumber(state.selectedTypes);
}

//PLACE CONTROLLER
const selectPlaceFilters = e => {
  const filterLi = e.target.closest('.filter-li');
  if(filterLi) filterLi.childNodes[0].classList.toggle('selected');
}

const clearFilterSelection = () => {
  document.querySelectorAll('.selected').forEach(filter => {
    filter.classList.remove('selected');
  })
}

const updateTypeSelection = () => {
  const selectedLinks = document.querySelectorAll('.selected');
  if(selectedLinks) {
    state.selectedTypes = [...selectedLinks].map(link => link.parentNode.id);
  } else {
    state.selectedTypes = Object.keys(googleMap.placeTypes);
  }
}

const applyFilterAction = e => {
  const applyAction = e.target.closest('#apply-filter');
  const clearAction = e.target.closest('#clear-filter');
  if(!applyAction && !clearAction) return;

  if(clearAction) {
    clearFilterSelection();
  }

  updateTypeSelection();
  googleMap.clearMarkers();
  state.selectedTypes.forEach(type => googleMap.showMarkers(type));
  googleMap.clearCards();
  state.selectedTypes.forEach(type => googleMap.createCard(type));
  googleMap.updatePlaceNumber(state.selectedTypes);
  e.preventDefault();
}

const loadInitPage = () => {
  googleMap.removePlaceDetails();
  googleMap.removeDirectionsPanel();
  googleMap.displayPlaceOverview();

  googleMap.removeDirectionsRenderer();
  googleMap.clearMarkers();
  googleMap.initMap(state.mapCenter);
  state.selectedTypes.forEach(type => googleMap.showMarkers(type));

  removeAllClickedStyle();
}

const addPlaceToPlanner = () => {
  const placeDetails = document.querySelector('.place-details');
  const placeId = placeDetails.id;
  const introHTML = placeDetails.querySelector('.place-intro').innerHTML;
  const placeItem = document.createElement('div');
  placeItem.className = 'list-item';
  placeItem.setAttribute('data-place-id', placeId);
  placeItem.setAttribute('draggable', true);
  placeItem.innerHTML = `<div class="item-content">${introHTML}</div><div class="item-actions"><i class="material-icons delete">delete</i><i class="material-icons duplicate">add_box</i></div>`;
  document.querySelector('.bucket .planner-list').appendChild(placeItem);
}

elements.placeContainer.addEventListener('click', e => {
  if(e.target.closest('.filter-buttons')) {
    selectPlaceFilters(e);
  } else if(e.target.closest('#filter-actions')) {
    applyFilterAction(e);
  } else if(e.target.closest('.back')) {
    loadInitPage();
  } else if(e.target.closest('.heart')) {
    addPlaceToPlanner();
  }
})

// PLANNER CONTROLLER
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

const duplicateListItem = e => {
  const itemNode = e.target.parentNode.parentNode;
  const clone = itemNode.cloneNode(true);
  itemNode.after(clone);
}

elements.plannerContent.addEventListener('click', e => {
  if(e.target.classList.contains('delete')) {
    e.target.parentNode.parentNode.remove();
  } else if(e.target.classList.contains('duplicate')) {
    duplicateListItem(e);
  } else if(e.target.closest('.planner-box')) {
    const selectedBox = e.target.closest('.planner-box');
    removeAllClickedStyle();
    addClickedStyle(selectedBox.querySelector('.title'));
    const placeIds = getPlaceIds(e);
    if(placeIds) googleMap.renderRoute(placeIds);
  }
  // } else if(e.target.closest('.save')) {
  //   const tripObj = createTripObj();
  //   tripAdapter.newTrip(tripObj);
  // }
  // } else if(e.target.closest('.clear')) {
  //   planner.clearDailyPlanners();
  //   planner.clearPlaceItems;
  //   planner.clearDateRange;
  //   clearFilterSelection();
  //   googleMap.clearPlaceNumber();
  //   googleMap.clearCards();
  //   googleMap.clearPlaces();
  //   googleMap.clearMarkers();
  //   elements.initModal.style.display = 'block';
  // } else if(e.target.closest('.save')) {
    
  // }
})

elements.plannerContent.addEventListener('dragstart', e => {
  if(e.target.closest('.list-item')) {
    e.target.closest('.list-item').classList.add('dragging');
  }
})

elements.plannerContent.addEventListener('dragend', e => {
  if(e.target.closest('.list-item')) {
    e.target.closest('.list-item').classList.remove('dragging');
  }
})

elements.plannerContent.addEventListener('dragover', e => {
  if(e.target.closest('.planner-list')) {
    sortAndDisplayItem(e);
  }
})

const sortAndDisplayItem = (e) => {
  const container = e.target.closest('.planner-list');
  const item = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(container, e.clientY);
  if(afterElement) {
    container.insertBefore(item, afterElement);
  } else {
    container.appendChild(item);
  }
  e.preventDefault();
}

const getDragAfterElement = (container, y) => {
  const draggableElms = [...container.querySelectorAll('.list-item:not(.dragging)')];
  return draggableElms.reduce((closest, child) => {
    const rect = child.getBoundingClientRect();
    const offset = y - rect.top - rect.height / 2;
    if(offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

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
  debugger

  const city = state.cityName;
  const lat = state.mapCenter.lat();
  const lng = state.mapCenter.lng();

  return {
    trip: { city, lat, lng, days_attributes }
  };
}