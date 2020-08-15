import { elements } from './modules/elements.js';
import * as googleMap from './modules/googleMap.js';

const state = {};

const getCity = () => {
  const city = googleMap.searchBox.getPlaces()[0];
  if(city === null) return
  state.mapCenter = city.geometry.location;
  localStorage.setItem('center', JSON.stringify(state.mapCenter)); // TODO: delete later
};

const submitInitForm = (e) => {
  // if (!state.mapCenter) {
    if(!state.mapCenter || !localStorage.getItem('center')) { // TODO: delete later
    alert('Something went wrong');
  } else {
    // googleMap.initMap(state.mapCenter);
    googleMap.initMap(JSON.parse(localStorage.getItem('center'))); // TODO: delete later

    (async function() {
      for (const type in googleMap.placeTypes) {
        // const results = await googleMap.getPlaces(state.mapCenter, 12000, type);
        const results = await googleMap.getPlaces(JSON.parse(localStorage.getItem('center')), 12000, type); // TODO: delete later
        results.forEach(place => googleMap.savePlace(place, type))
        googleMap.addMarker(type);
        googleMap.showMarkers(type);
        googleMap.createCard(type);
      }
    })();

    elements.initModal.style.display = 'none';
  }
  e.preventDefault();
}

const filterPlaces = (e) => {
  const filterLi = e.target.closest('.filter-li');
  if(filterLi) {
    filterLi.childNodes[0].classList.toggle('selected');
  } else if(e.target.id === 'apply-filter') {
    const liArr = Array.from(e.target.parentNode.previousElementSibling.children);
    const selectedFilters = liArr.filter(li => li.children[0].classList.contains('selected'));
    state.selectedTypes = selectedFilters.map(li => li.id);

    googleMap.clearMarkers();
    state.selectedTypes.forEach(type => googleMap.showMarkers(type));

    googleMap.clearCard();
    state.selectedTypes.forEach(type => googleMap.createCard(type));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('places')) {
    elements.searchModal.style.display = 'none';
  } // TODO: delete later

  googleMap.searchBox.addListener('places_changed', getCity);
  elements.initForm.addEventListener('submit', submitInitForm);
  elements.placeFilter.addEventListener('click', filterPlaces);
})