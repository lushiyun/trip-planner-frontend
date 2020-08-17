import { elements } from './elements.js';
import * as planner from './Planner.js';
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

export const searchBox = new google.maps.places.SearchBox(elements.cityInput);

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

export function updatePlaceNumber(types) {
  elements.placeNum.innerText = '';
  const numArr = types.map(type => places[type].length);
  const totalNum = numArr.reduce((memo, curr) => memo + curr, 0);
  if(totalNum === 1) {
    elements.placeNum.innerText = '1 Place';
  } else {
    elements.placeNum.innerText = `${totalNum} Places`;
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
    markers[type] ? (markers[type].push(marker)) : (markers[type] = [marker]);
    marker.addListener('click', () => {
      openInfowindow(place, marker);
      scrollToCard(place);
    });
  })
}

export function showMarkers(type) {
  markers[type].forEach(marker => marker.setMap(map));
}

export function clearMarkers() {
  Object.values(markers).flat().forEach(marker => marker.setMap(null));
}

function ratingCalc(rating) {
  const starPercentage = (rating / 5) * 100;
  return `${Math.round(starPercentage / 10) * 10}%`;
}

export function createCard(type) {
  places[type].forEach(place => {
    const imgSrc = (place.photos ? place.photos[0].getUrl({maxHeight: 300, maxWidth: 300}) : 'https://via.placeholder.com/150');

    const starPercentageRounded = ratingCalc(place.rating);
    const numberWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const userRatings = (place.user_ratings_total ? numberWithCommas(place.user_ratings_total) : '');

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

export function clearCard() {
  elements.placeList.innerHTML = '';
}

export function renderRoute(e) {
  const placeIdArr = getPlaceIds(e);
  if(placeIdArr == null) return

  const directionsPanel = createDirectionsPanel();

  if (directionsRenderer != null) {
    directionsRenderer.setMap(null);
    directionsRenderer = null;
  }
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(directionsPanel);

  const stopovers = placeIdArr.slice(1, placeIdArr.length - 1).map(id => {
    return {stopover: true, location: {placeId: id}}
  });
  const request = {
    origin: {placeId: placeIdArr[0]},
    destination: {placeId: placeIdArr[placeIdArr.length - 1]},
    waypoints: stopovers,
    travelMode: google.maps.TravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      clearMarkers();
      directionsRenderer.setDirections(result);
    } else {
      console.log(status);
    }
  });
}

function getPlaceIds(e) {
  const titleElm = e.target.closest('.title');
  const itemElms = (titleElm.nextElementSibling.children ? [...titleElm.nextElementSibling.children] : null);
  if (!itemElms || itemElms.length < 2) return null;
  return itemElms.map(item => item.dataset.placeId);
}

function createDirectionsPanel() {
  if(document.querySelector('.place-overview')) {
    document.querySelector('.place-overview').style.display = 'none';
  }
  if(document.querySelector('.place-details')) {
    document.querySelector('.place-details').remove();
  }
  if(document.querySelector('#directionsPanel')) {
    document.querySelector('#directionsPanel').remove();
  }
  const directionsPanel = document.createElement('div');
  directionsPanel.id = 'directionsPanel';
  const directionsActions = document.createElement('div');
  directionsActions.className = 'place-actions';
  const backBtn = createBackBtn();
  directionsActions.appendChild(backBtn);
  directionsPanel.appendChild(directionsActions);
  elements.placeContainer.appendChild(directionsPanel);
  return directionsPanel;
}

function openInfowindow(place, marker) {
  const infowindow = new google.maps.InfoWindow({content: `<p>${place.name}</p>`});
  infowindow.open(map, marker);
}

function scrollToCard(place) {
  const selectedCard = document.getElementById(place.place_id);
  selectedCard.scrollIntoView({behavior: 'smooth'});
}

function highlightMarker(place) {
  const selectedMarker = Object.values(markers).flat().find(marker => marker.getTitle() === place.place_id);
  clearMarkers();
  selectedMarker.setMap(map);
  map.panTo(selectedMarker.getPosition());
  const infowindow = new google.maps.InfoWindow({content: `<p>${place.name}</p>`});
  infowindow.open(map, selectedMarker);
}

async function showPlaceDetails(place, type) {
  const result = await getPlaceDetails(place);
  const placeDetails = document.createElement('div');
  placeDetails.className = 'place-details';

  if(result.photos) {
    const heroPhotoSrc = result.photos[0].getUrl({maxHeight: 300, maxWidth: 300});
    placeDetails.innerHTML += `<div class="hero-photo" style="background-image: url(${heroPhotoSrc})"></div>`;
    if(result.photos.length > 1) {
      const photoGallery = document.createElement('div');
      photoGallery.className = 'photo-gallery';
      result.photos.slice(1).forEach(photo => {
        const imgSrc = photo.getUrl({maxHeight: 200, maxWidth: 200});
        photoGallery.innerHTML += `<a href="${imgSrc}" target="_blank" rel="noopener noreferrer"><img src="${imgSrc}"></a>`;
      })
      placeDetails.appendChild(photoGallery);
    }
  }

  placeDetails.innerHTML += `
  <div class="place-intro"><div class="icon icon-${type}"><i class="material-icons">local_${type}</i></div><p class="place-name">${result.name}</p><p class="place-address">${result.formatted_address}</p></div><div class="place-contact"><p><i class="material-icons">local_phone</i> ${result.formatted_phone_number}</p><p><i class="material-icons">language</i><a href="${result.website}">${result.website}</a></p></div>
  `;

  if(result.weekday_text) {
    const buzHours = result.weekday_text.reduce((memo, curr) => {
      return `<p>${memo}</p>` + `<p>${curr}</p>`
    }, '');
    placeDetails.innerHTML += `<div class="place-hours"><h4>Business Hours</h4>${buzHours}</div>`;
  }

  const reviewDiv = document.createElement('div');
  reviewDiv.className = 'place-reviews';

  const starPercentageRounded = ratingCalc(result.rating);
  reviewDiv.innerHTML += `
  <div class="review-intro"><h4>Reviews</h4><div class="place-rating"><div class="stars-outer"><div class="stars-inner" style="width:${starPercentageRounded}></div></div> <span>${result.rating}</span></div></div>
  `;
  const reviewList = document.createElement('div');
  reviewList.className = 'review-list';
  result.reviews.forEach(review => {
    const reviewerRatingRounded = ratingCalc(review.rating);
    reviewList.innerHTML += `
    <div class="review-card"><div class="review-content"><p>${review.text}</p></div><div class="reviewer-rating"><div class="place-rating"><div class="stars-outer"><div class="stars-inner" style="width:${reviewerRatingRounded}"></div></div> ${review.rating}</div></div><div class="reviewer-profile"><div class="reviewer-intro"><p class="reviewer-name">${review.author_name}</p><p class="review-time">${review.relative_time_description}</p></div><img src="${review.profile_photo_url}"></div></div>
    `;
  })
  reviewDiv.appendChild(reviewList);
  placeDetails.appendChild(reviewDiv);

  const placeActions = document.createElement('div');
  placeActions.className = 'place-actions';

  const backBtn = createBackBtn();
  placeActions.appendChild(backBtn);

  const saveBtn = document.createElement('a');
  saveBtn.className = 'heart';
  saveBtn.innerHTML = `<i class="material-icons">favorite</i>`;
  placeActions.appendChild(saveBtn);
  saveBtn.addEventListener('click', () => planner.addPlaceToPlanner(place, type));

  placeDetails.appendChild(placeActions);
  elements.placeOverview.style.display = 'none';
  elements.placeContainer.appendChild(placeDetails);
}

function createBackBtn() {
  const backBtn = document.createElement('a');
  backBtn.className = 'back';
  backBtn.innerHTML = `<i class="material-icons">arrow_back</i>`;
  backBtn.addEventListener('click', loadInitPage);
  return backBtn;
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

function loadInitPage(e) {
  const targetLink = e.target.closest('a');
  targetLink.parentNode.parentNode.remove();

  if (directionsRenderer != null) {
    directionsRenderer.setMap(null);
    directionsRenderer = null;
  }

  elements.placeOverview.removeAttribute('style');

  clearMarkers();
  const selectedLinks = document.querySelectorAll('.selected');
  if(selectedLinks) {
    const types = [...selectedLinks].map(link => link.parentNode.id);
    types.forEach(type => showMarkers(type));
  } else {
    debugger
    Object.values(markers).flat().forEach(marker => marker.setMap(map));
  }
  
  Array.from(document.querySelectorAll('.title')).forEach(title => {
    title.classList.remove('clicked');
  })
}