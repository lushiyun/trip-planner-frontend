import { elements } from './elements.js';
import * as GMStyles from './GMStyles.js';

let map;
let service;
const places = {};
const markers = {};

export const placeTypes = {
  see: 'tourist_attraction',
  dining: 'restaurant',
  cafe: 'cafe',
  bar: 'bar',
  hotel: 'lodging',
  mall: 'shopping_mall'
}

export const searchBox = new google.maps.places.SearchBox(elements.cityInput);

export function initMap(center) {
  map = new google.maps.Map(elements.map, {
    center: center,
    zoom: 13,
    styles: GMStyles.mapStyles
  });
  localStorage.setItem('map', map); // TODO: delete later
};

export function getPlaces(location, radius, type) {
  const request = {
    location: location,
    radius: radius,
    type: placeTypes[type]
  }
  // service = new google.maps.places.PlacesService(map);
  service = new google.maps.places.PlacesService(localStorage.getItem('map')); // TODO: delete later
  return new Promise((resolve, reject) => {
    service.nearbySearch(request, (results, status) => {
      if(status == google.maps.places.PlacesServiceStatus.OK) {      
        resolve(results);
      } else {
        reject(status);
      }
    });
  })
}

// {
//   type: [place, place, ...],
//   type: [place, place, ...]
// }
export function savePlace(place, type) {
  const placesArr = Object.values(places).flat();
  if(placesArr.find(record => record.place_id === place.place_id)) return
  places[type] ? (places[type].push(place)) : (places[type] = [place]);

  localStorage.setItem('places', JSON.stringify(places)); // TODO: delete later
}

export function addMarker(type) {
  // places[type].forEach(place => {
  JSON.parse(localStorage.getItem('places'))[type].forEach(place => { // TODO: delete later
    const marker = new google.maps.Marker({
      // map,
      map: localStorage.getItem('map'), // TODO: delete later
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      icon: GMStyles.icons[type]
    })
    markers[type] ? (markers[type].push(marker)) : (markers[type] = [marker]);
    localStorage.setItem('markers', markers); // TODO: delete later
    marker.addListener('click', () => {
      const infowindow = new google.maps.InfoWindow({content: `<p>${place.name}</p>`});
      infowindow.open(map, marker);
      const selectedCard = document.getElementById(place.place_id);
      selectedCard.scrollIntoView({behavior: 'smooth'});
    });
  });
}

export function showMarkers(type) {
  // markers[type].forEach(marker => marker.setMap(map));
  localStorage.getItem('markers')[type].forEach(marker => marker.setMap(map)); // TODO: delete later
}

export function clearMarkers() {
  // Object.values(markers).flat().forEach(marker => marker.setMap(null));
  markers = localStorage.getItem('markers'); // TODO: delete later
  Object.values(markers).flat().forEach(marker => marker.setMap(null));
}

export function createCard(type) {
  // places[type].forEach(place => {
  JSON.parse(localStorage.getItem('places'))[type].forEach(place => { // TODO: delete later
    const imgSrc = (() => place.photos ? (place.photos[0].getUrl({maxHeight: 300, maxWidth: 300})) : ('https://via.placeholder.com/150'))();

    const starPercentage = (place.rating / 5) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    const numberWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const userRatings = (() => place.user_ratings_total ? (numberWithCommas(place.user_ratings_total)) : (''))();

    const placeCard = document.createElement('div');
    placeCard.className = 'place-card';
    placeCard.id = `${place.place_id}`;
    placeCard.innerHTML = `<div class="place-content"><div class="icon icon-${type}"><i class="material-icons">local_${type}</i></div><p class="place-name">${place.name}</p><p class="place-address">${place.vicinity}</p><div class="place-rating"><div class="stars-outer"><div class="stars-inner" style="width:${starPercentageRounded}"></div></div> (${userRatings})</div></div><img class="place-img" src="${imgSrc}" alt="${place.name} photo"></div>
    `;
    elements.placeList.appendChild(placeCard);
    // placeCard.addEventListener('click', () => showPlaceDetails(place));
  })
}

export function clearCard() {
  elements.placeList.innerHTML = '';
}

// function showPlaceDetails(place) {
//   service = new google.maps.places.PlacesService(map);
//   service.getDetails(request, callback);

//   const detailModal = document.createElement('section');
//   detailModal.className = 'modal';

// }