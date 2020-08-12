import { elements } from './modules/elements.js';
import * as googleMap from './modules/googleMap.js';

const state = {};

googleMap.searchBox.addListener('places_changed', () => {
  const city = googleMap.searchBox.getPlaces()[0];
  if(city === null) return
  state.mapCenter = city.geometry.location;
});

const submitInitForm = (e) => {
  if (!state.mapCenter) {
    console.log('something went wrong');
  } else {
    googleMap.initMap(state.mapCenter);
    loadPlaces();
    elements.initModal.style.display = 'none';
  }
  e.preventDefault();
}

async function loadPlaces () {
  await googleMap.getPlaces(state.mapCenter, 12000, 'lodging');
  googleMap.createMarker('lodging');
  googleMap.createCard('lodging');
}

elements.initForm.addEventListener('submit', submitInitForm);