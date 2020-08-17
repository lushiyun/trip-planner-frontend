import { elements } from './modules/elements.js';
import * as googleMap from './modules/googleMap.js';
import * as planner from './modules/Planner.js'

const state = {};

const submitInitForm = (e) => {
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

const getCity = () => {
  const city = googleMap.searchBox.getPlaces()[0];
  if(city === null) return
  state.mapCenter = city.geometry.location;
};

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

const selectPlaceFilters = (e) => {
  const filterLi = e.target.closest('.filter-li');
  if(filterLi) {
    filterLi.childNodes[0].classList.toggle('selected');
  }
}

const applyFilterAction = (e) => {
  const applyAction = e.target.closest('#apply-filter');
  const clearAction = e.target.closest('#clear-filter');
  if(!applyAction && !clearAction) return;

  const liArr = Array.from(e.target.parentNode.previousElementSibling.children);
  if(applyAction) {
    const selectedFilters = liArr.filter(li => li.children[0].classList.contains('selected'));
    state.selectedTypes = selectedFilters.map(li => li.id);
  } else {
    liArr.forEach(li => {li.children[0].classList.remove('selected')});
    state.selectedTypes = Object.keys(googleMap.placeTypes);
  }
  googleMap.clearMarkers();
  state.selectedTypes.forEach(type => googleMap.showMarkers(type));
  googleMap.clearCard();
  state.selectedTypes.forEach(type => googleMap.createCard(type));
  googleMap.updatePlaceNumber(state.selectedTypes);
  e.preventDefault();
}

document.addEventListener('DOMContentLoaded', () => {
  googleMap.searchBox.addListener('places_changed', getCity);
  elements.initForm.addEventListener('submit', submitInitForm);
  elements.filterBtns.addEventListener('click', selectPlaceFilters);
  elements.filterActions.addEventListener('click', applyFilterAction);
  elements.filterActions.addEventListener('click', () => {
    const selectedLinks = document.querySelectorAll('.selected');
    console.log()
  });

})