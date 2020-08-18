import { elements } from './elements.js';
import * as GMStyles from './GMStyles.js';

let map;
let service;
let directionsService;
let directionsRenderer;
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

export function initMap(center) {
  map = new google.maps.Map(elements.map, {
    center: center,
    zoom: 13,
    styles: GMStyles.mapStyles
  });
}

export function getPlaces(location, radius, type) {
  const request = {
    location: location,
    radius: radius,
    type: placeTypes[type]
  }
  service = new google.maps.places.PlacesService(map);
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

export function savePlace(place, type) {
  const placesArr = Object.values(places).flat();
  if(placesArr.find(record => record.place_id === place.place_id)) return
  places[type] ? (places[type].push(place)) : (places[type] = [place]);
}

export function clearPlaceNumber() {
  document.querySelector('#place-num').innerText = '';
}

export function updatePlaceNumber(types) {
  clearPlaceNumber();
  const numArr = types.map(type => places[type].length);
  const totalNum = numArr.reduce((memo, curr) => memo + curr, 0);
  if(totalNum === 1) {
    document.querySelector('#place-num').innerText = '1 Place';
  } else {
    document.querySelector('#place-num').innerText = `${totalNum} Places`;
  }
}

export function addMarker(type) {
  places[type].forEach(place => {
    const marker = new google.maps.Marker({
      map,
      title: place.place_id,
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      icon: GMStyles.icons[type]
    })
    markers[type] ? markers[type].push(marker) : markers[type] = [marker];
    marker.addListener('click', () => {
      openInfowindow(place, marker);
      scrollToCard(place);
    });
  })
}

function openInfowindow(place, marker) {
  const infowindow = new google.maps.InfoWindow({content: `<p>${place.name}</p>`});
  infowindow.open(map, marker);
}

function scrollToCard(place) {
  const selectedCard = document.getElementById(place.place_id);
  selectedCard.scrollIntoView({behavior: 'smooth'});
}

export function showMarkers(type) {
  markers[type].forEach(marker => marker.setMap(map));
}

export function clearMarkers() {
  Object.values(markers).flat().forEach(marker => marker.setMap(null));
}

function getPlaceCardImg(place) {
  return place.photos ? place.photos[0].getUrl({maxHeight: 300, maxWidth: 300}) : 'https://via.placeholder.com/150';
}

function ratingCalc(rating) {
  const starPercentage = (rating / 5) * 100;
  return `${Math.round(starPercentage / 10) * 10}%`;
}

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getPlaceCardRating(place) {
  return place.user_ratings_total ? numberWithCommas(place.user_ratings_total) : '';
}

export function createCard(type) {
  places[type].forEach(place => {
    const imgSrc = getPlaceCardImg(place);
    const starPercentageRounded = ratingCalc(place.rating);
    const userRatings = getPlaceCardRating(place);

    const placeCard = document.createElement('div');
    placeCard.className = 'place-card';
    placeCard.id = `${place.place_id}`;
    placeCard.innerHTML = `<div class="place-content"><div class="icon icon-${type}"><i class="material-icons">local_${type}</i></div><p class="place-name">${place.name}</p><p class="place-address">${place.vicinity}</p><div class="place-rating"><div class="stars-outer"><div class="stars-inner" style="width:${starPercentageRounded}"></div></div> (${userRatings})</div></div><img class="place-img" src="${imgSrc}" alt="${place.name} photo"></div>
    `;
    elements.placeList.appendChild(placeCard);
    placeCard.addEventListener('click', () => {
      highlightMarker(place);
      showPlaceDetails(place, type);
    });
  })
}

export function clearCards() {
  elements.placeList.innerHTML = '';
}

function highlightMarker(place) {
  const selectedMarker = Object.values(markers).flat().find(marker => marker.getTitle() === place.place_id);
  clearMarkers();
  selectedMarker.setMap(map);
  map.panTo(selectedMarker.getPosition());
  openInfowindow(place, selectedMarker);
}

function getPlaceDetails(place) {
  const request = { placeId: `${place.place_id}`};
  service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails(request, (result, status) => {
      if(status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(result);
      } else {
        reject(status);
      }
    })
  });
}

function getPlaceHeroPhoto(photo) {
  const heroPhotoSrc = photo.getUrl({maxHeight: 300, maxWidth: 300});
  return `<div class="hero-photo" style="background-image: url(${heroPhotoSrc})"></div>`;
}

function getPlacePhotoGallery(photos) {
  const photoGallery = document.createElement('div');
  photoGallery.className = 'photo-gallery';
  photos.forEach(photo => {
    const imgSrc = photo.getUrl({maxHeight: 200, maxWidth: 200});
    photoGallery.innerHTML += `<a href="${imgSrc}" target="_blank" rel="noopener noreferrer"><img src="${imgSrc}"></a>`;
  })
  return photoGallery;
}

function getPlaceIntro(result, type) {
  return `<div class="place-intro"><div class="icon icon-${type}"><i class="material-icons">local_${type}</i></div><p class="place-name">${result.name}</p></div><p class="place-address">${result.formatted_address}</p><div class="place-contact"><p><i class="material-icons">local_phone</i> ${result.formatted_phone_number}</p><p><i class="material-icons">language</i><a href="${result.website}">${result.website}</a></p></div>`;
}

function getPlaceBizHours(hours) {
  const bizHours = hours.reduce((memo, curr) => {
    return `<p>${memo}</p>` + `<p>${curr}</p>`
  }, '');
  return `<div class="place-hours"><h4>Business Hours</h4>${bizHours}</div>`;
}

function getPlaceReviewDiv(reviews) {
  const reviewDiv = document.createElement('div');
  reviewDiv.className = 'place-reviews';
  reviewDiv.innerHTML += `<div class="review-intro"><h4>Reviews</h4></div>`;

  const reviewList = document.createElement('div');
  reviewList.className = 'review-list';
  reviews.forEach(review => {
    const reviewerRatingRounded = ratingCalc(review.rating);
    reviewList.innerHTML += `
    <div class="review-card"><div class="review-content"><p>${review.text}</p></div><div class="reviewer-rating"><div class="place-rating"><div class="stars-outer"><div class="stars-inner" style="width:${reviewerRatingRounded}"></div></div> ${review.rating}</div></div><div class="reviewer-profile"><div class="reviewer-intro"><p class="reviewer-name">${review.author_name}</p><p class="review-time">${review.relative_time_description}</p></div><img src="${review.profile_photo_url}"></div></div>
    `;
  })
  reviewDiv.appendChild(reviewList);
  return reviewDiv;
}

function getPlaceActionDiv() {
  return `<div class="place-actions"><a class="back"><i class="material-icons">arrow_back</i></a><a class="heart"><i class="material-icons">favorite</i></a></div>`
}

async function showPlaceDetails(place, type) {
  const result = await getPlaceDetails(place);
  const placeDetails = document.createElement('div');
  placeDetails.className = 'place-details';
  placeDetails.id = result.place_id;

  if(result.photos) {
    placeDetails.innerHTML += getPlaceHeroPhoto(result.photos[0]);
    if(result.photos.length > 1) {
      placeDetails.appendChild(getPlacePhotoGallery(result.photos.slice(1)));
    }
  }
  placeDetails.innerHTML += getPlaceIntro(result, type);
  if(result.weekday_text) placeDetails.innerHTML += getPlaceBizHours(result.weekday_text);
  placeDetails.appendChild(getPlaceReviewDiv(result.reviews));
  placeDetails.innerHTML += getPlaceActionDiv();

  hidePlaceOverview();
  elements.placeContainer.appendChild(placeDetails);
}

function createDirectionsPanel() {
  const directionsPanel = document.createElement('div');
  directionsPanel.id = 'directionsPanel';
  directionsPanel.innerHTML += `<div class="place-actions"><a class="back"><i class="material-icons">arrow_back</i></a></div>`
  elements.placeContainer.appendChild(directionsPanel);
  return directionsPanel;
}

export function renderRoute(placeIds) {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  const stopovers = placeIds.slice(1, placeIds.length - 1).map(id => {
    return {stopover: true, location: {placeId: id}}
  });
  const request = {
    origin: {placeId: placeIds[0]},
    destination: {placeId: placeIds[placeIds.length - 1]},
    waypoints: stopovers,
    travelMode: google.maps.TravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      clearMarkers();
      removeDirectionsRenderer();
      directionsRenderer.setMap(map);
      hidePlaceOverview();
      removePlaceDetails();
      const directionsPanel = createDirectionsPanel();
      directionsRenderer.setPanel(directionsPanel);
      directionsRenderer.setDirections(result);
    } else {
      console.log(status);
    }
  });
}

export function hidePlaceOverview() {
  if(document.querySelector('.place-overview')) document.querySelector('.place-overview').style.display = 'none';
}

export function displayPlaceOverview() {
  document.querySelector('.place-overview').removeAttribute('style');
}

export function removePlaceDetails() {
  if(document.querySelector('.place-details')) document.querySelector('.place-details').remove();
}

export function removeDirectionsPanel() {
  if(document.querySelector('#directionsPanel')) document.querySelector('#directionsPanel').remove();
}

export function removeDirectionsRenderer() {
  if (directionsRenderer != null) {
    directionsRenderer.setMap(null);
    directionsRenderer = null;
  }
}