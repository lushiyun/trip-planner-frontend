import { elements } from './modules/elements.js';
import * as googleMap from './modules/Map.js';
import * as planner from './modules/Planner.js'

const state = {};

// INIT FORM CONTROLLER
const searchBox = new google.maps.places.SearchBox(elements.cityInput);

searchBox.addListener('places_changed', () => {
  const city = searchBox.getPlaces()[0];
  if(city === null) return
  state.mapCenter = city.geometry.location;
})

elements.initForm.addEventListener('submit', e => {
  e.preventDefault();
  controlInit(e);
})

const controlInit = e => {
  if (!state.mapCenter) {
    alert('Something went wrong');
  } else {
    planner.getDates();
    googleMap.initMap(state.mapCenter);
    state.selectedTypes = Object.keys(googleMap.placeTypes);
    loadMap();
    planner.getWeather(state.mapCenter.lat(), state.mapCenter.lng());
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
  state.selectedTypes.forEach(type => googleMap.showMarkers(type));

  removeAllClickedStyle();
}

const addPlaceToPlanner = e => {
  const placeDetails = document.querySelector('.place-details');
  const placeId = placeDetails.id;
  const introHTML = placeDetails.querySelector('.place-intro').innerHTML;
  const placeItem = document.createElement('div');
  placeItem.className = 'list-item';
  placeItem.setAttribute('data-place-id', placeId);
  placeItem.setAttribute('draggable', true);
  placeItem.innerHTML = `<div class="item-content">${introHTML}</div><div class="item-actions"><i class="material-icons delete">delete</i><i class="material-icons duplicate">add_box</i></div>`;
  elements.placeBucket.querySelector('.planner-list').appendChild(placeItem);
}

elements.placeContainer.addEventListener('click', e => {
  if(e.target.closest('.filter-buttons')) {
    selectPlaceFilters(e);
  } else if(e.target.closest('#filter-actions')) {
    applyFilterAction(e);
  } else if(e.target.closest('.back')) {
    loadInitPage();
  } else if(e.target.closest('.heart')) {
    addPlaceToPlanner(e);
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
  } else if(e.target.classList.contains('title')) {
    removeAllClickedStyle();
    addClickedStyle(e.target);
    const placeIds = getPlaceIds(e);
    if(placeIds) googleMap.renderRoute(placeIds);
  }
})

elements.plannerContent.addEventListener('dragstart', e => {
  if(e.target.classList.contains('list-item')) {
    e.target.classList.add('dragging');
  }
})

elements.plannerContent.addEventListener('dragend', e => {
  if(e.target.classList.contains('list-item')) {
    e.target.classList.remove('dragging');
  }
})