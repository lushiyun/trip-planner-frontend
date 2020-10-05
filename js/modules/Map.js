const GM_STYLES = {
  mapStyles: [
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
  icons: {
    see:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB0ElEQVRIiaWWr0/DQBTHv7ciWegkis1gN0wtS5CQwIJBQZopDDAEkvDDIfjlCQOFITCB3pBUsGEx659QMiRNyaV342jvel37TZp0r91n3/fu3bsRKGRYQRnALoAagLrw1gBAD0DHd0hP9u0Y1LACE8AtgDXVDwqi0JbvkIESalgBddUFYKYAcnkM3I5BMwJFNXyHPI+hLOU+gHJGIJjjiu8Qb4oF9lTArWVgc+Xv88cnsH8hhVJj9InNnQ5F6M4GYBYBczq8j+r6AfC+AW8U3kdUIoYV1Fktx/p5S5/z0jbw+v4vZBciPSjV/QuwfiB1JVO1oHuD1o+m+XgGzM0CzRMttKaF0oXhdV1dBGaKYSxJWmgGuQW21ZSqzrPVHoW1/RqFsaTkCmxAKHXeCtureRqCbw611nu8T5/EAZKjpVzfIRW+ozoilK44dacTdR7p0TtEBsow596nKtG9L67+cU5gmwIhmadZ3VLYgu8QF5I+zer2igNjThG67aaZB4Jc5tLjIdmOsid0aYtAKZSlkbYMl7ITNemI1pUhlrbSqSCbrapKDRkwEcrKoKpv7KyfSIYVHBlWEAgX/aORX3TgMGCfHeeJ4gNFJ16GWPvEBOAXDJWposVp8PsAAAAASUVORK5CYII=",
    hotel:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAABwElEQVRIia2WQU4CMRSG/5kSoytn6w7mAuIJ1HgANV4ALmDkAipcQOUCeAQ8gBFOICeouDKuGF2Z6FDzpi2ZdjrMMPBtCK/lz//e62vxkIPgrAXgFEATQF3tigBMADwBePTCOHL9OiMqODsDcJcSyoMEH7wwvl0qKjgbAGgViNmQ8+O064VoRUGNIeynUq4qCFX3G8Op4OytRA3L0PDCeOqrLm9CENqtr46NZPsQaPzJz2pQGVFT9TDxA2DvGdjaB777cim4NvfMI7k266WjgeCs7jtT372UbkncFtPotWxWiWiWuXNQ3OxkS+WryTD56gNRD/gZA58XqxY3qqmDe2SEqZ6aFZvmhfGEnI5XtbKEIVT3h+lpSPg4kakXQcfPhG4v+GRXlUA2iMTKNor2/r6nI4lTPaY0VYM1U6f7tQ3rllp3/pO5h76lFN01XU71F/uSfnWO7XIi5XLRCHuiOhVcdu23yvVG0ft0VVJw4oXxgR10zT7VduqIu2i7ghlRlYpzs0VHnfFiUSU8KjgNIy+M7/MWc/9MQNb3JXPZOLpdymmKc0d9jTe+EoKzpuBsJjgTapw3A4kJzjJ/b5wA+AepRpUoXZHF9AAAAABJRU5ErkJggg==",
    dining:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAABsElEQVRIia2WP0/CQBjGn2tY3IirDnVwh4m1fgIgjg7KBziVT0AZncDcagLfQJgcqaOTxBUT+wkMm2PNS+9oae+ubcqTkCv35/c+dy/3FgaDIg4XQA9AF0ALQFPODAEEAJZMYKFbnYNGfLf4EcDIFDAlCjBgYhdED5XAlXRWRWMm4OegNYBKe7CT6pzVAJJGEYdHDw3p0pNJSXTWAv62wEnzsP0N4ymnbvydPofGLpTTh1zc6wnQucu3pJsZ4P8A57mNuRFHT0F72VGjLr0ErlfXUedwRLkNK6tzG58lnR+1m/cyoT3HOEQABaOW9DEvtR8z9M0HXvrx83cAPLWTzNu1JujaOOVrkbhWwE0A3BtLBil0mMDWCq6updr+8ojQQEHLZaBYCyYQpgvKa6VLoNcVlcF09p9rAgNVV/dQ2RFYl9k1VqPZ3+mgrssclA45HbGCDszobtRUvnvKaizNJOZ0C2XlWpWArplAO9upvfvyfKYFwK0pB9ZLHHF8Wt5bQyb0gc1VKlZfOspqbgIWQmUCsluk4jO0rStySmCqfwpCrvuystVXxDGJeIn/BQD+ARyCeckINsdpAAAAAElFTkSuQmCC",
    cafe:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAABw0lEQVRIia2VP1LbQBSHv9U4FY0pUuMbxNzAvgEUUcv4BskJEk6AfYLgVhSQE1icIGqoKHAKN6FRkzQUm3nWs2dl7Uor4JvReLSr/b3n928NATLsGLgAJsDY+SoHCmCZYgrf6YZohh0BP1SsCzEwSzHroGiGPVPBYYTgjhKYul7vRTOseLbqIRYUNioonj319PAQCcFpiikT3bh6o6Agufiy9dTn5SQyCJuf8DivLZUp5thocm7dnc+2Xeyv5vpoBDfNopwmBzUYxe9l9QSYDIBPfUVPLqrfl9K/P3hNgv6t4fkeSm8/VaL3kd2zRwQfvof3E62v96RItH9rbO7aTfxpnKiR7zrql1sFH4YwvqpK5pDHRavRIsWcDvRl6YoOx7AOlwwfJ1XmPYlaEOr9ruIXnnPIp7WlbTeh2UeGQIYVK9/k3dMlMSx23yTOx3MdYa+h1PN1UfHWtdaTr3oeAtfJk46xWPIUU4tu4jk46+vl4UJDNMXkbnw6uPTdqN48a4mtOsbittB9G76/v0varKUaZP08ZM0rqsKFL15K466PElXha0Ael3mK6Rg5EcjAybA2w0Zdia2eOkgdisfBOO4B/gO6BIIhsXbEYwAAAABJRU5ErkJggg==",
    bar:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB9UlEQVRIiaWWu27UQBSGvxmlgWqjtCDCEyRtqAg1EuQJNknhkrDUCLG8AGzrImRbGoKgRSwVHdqUVNkotCu5gs5GxzPejO2ZsbX8zchz+Xwuc46t8KjQyQB4CjwBdoFtuysDZsB34EzlaeY734IWOjkE3gID3wFHApyoPH0dhRY6eQ8cdsCaEssPXKv1fwJFD4Fv7oS2wOdrAivtFjpZhUHZpFyuYri9Bfe2+qGulrBYujP3VZ4uNqyFN0kZPoBXj/tB33yB8Wd35gQYbdhrc6PzOTx7ZB6Pp5D9qYMGt+F0aMbZr+Zr5BqOxP2iZcHOXfj50rh2tayvDW6Z9eMzmP5oHVV5qvxQ0XAPTgO5e/EBJl/9a7CvQyulFWKNbz4MLBWGVgDXxdCL6poLdB7dIpCLaxNfcTuuTCpL2zLr2PrXJKx5E9oqWQKddkL76xNVQyl0cum0NyPJvhSCaOeOGS9+m3F+7QuFuL6Jk6hx1BaBVcCwJtVKZWm9/tdTWfcrS20vjFsb17gC4mnS7dh2K7NWtpu01dEaVo6a3yrfN+qj7TZ9NFN5ut/c5yvTI+tSl7KQZy2odeWgB7SWnC5LBSzl9i4CPFd5GlwPdimVp6NAs1l0JTTe+kCS4Ma3DE3oz6QX1B52syvXJ94q+0p+hezvULeAfxFZrHdjLFdnAAAAAElFTkSuQmCC",
    mall:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVRIia2WMUvDQBTH/w1FBB1SEOzgUEVwESy4i/cJrHOGtt/AfALrJ7D9BG2HzG13IRldxIwKoh0cFAQzKIgIyru8aJpckrP6h9DL9d3v3r139y4lqOQ6JoAGgAMAdQA1tpoC8AFMAIwhrEA1PA11nSMAxwBM5YQ/IuAJhNXNh7pOH0CrAJbUAIAd99r4IxA8ph/vMBjYmRMYqcEMqRIn5S4rho2VNTSrG7I9fLjF+Ok+C0zLX6cwGOyhErhvrmK0vff9Tm3qyxAxKMkoA2hmAZvVdUzfXtG7v5Z99eWK7CN5waNqGG3BDi3/M/nP0doWTjd3szySsm8u0OXJZiSskqEaYJYX5C95SYPjIP/lecYmJdeplfO8qS0uYWe5gvbVuXynNoWgQGYulNSqbsgn+HjP9m52+b7B57lQWkBmEdTTsdaUF0En/wiVrLCguM5drLzJZOhsqWgnsAIIS2YxStSQy50UGQv/7Lde9qJGtE+7fHbnVcCMGDSshb0/QHvqehrOpLW9EprGvZyFhjPZc0Dt5F2luqNGfOnpyIOwRNJOVVDamkkL2DalNDRcitI4NbmwlDlQlj4Ia8y3ZJYGbKOUGhrK5g+HpPyihKq/UCK5Dh3dy9gdRqERVN7yhuV5SmGgmB3GeiiOuUB9uU5LPjoC8AUPFo/n8ryUHAAAAABJRU5ErkJggg==",
  },
};

const elements = {
  map: document.querySelector("#map"),
  placeContainer: document.querySelector(".place-container"),
  placeOverview: document.querySelector(".place-overview"),
  placeNum: document.querySelector("#place-num"),
  placeList: document.querySelector(".place-list"),
};

let map;
let service;
let directionsService;
let directionsRenderer;
const places = {};
const markers = {};

export function initMap(center) {
  map = new google.maps.Map(elements.map, {
    center: center,
    zoom: 13,
    styles: GM_STYLES.mapStyles,
  });
}

export function getPlaces(location, radius, type) {
  const request = {
    location,
    radius,
    type,
  };
  service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
}

export function savePlace(place, type) {
  // an array of type objects with each type containing corresponding place data for easy filtering
  const placesArr = Object.values(places).flat();
  if (placesArr.find((record) => record.place_id === place.place_id)) return;
  places[type] ? places[type].push(place) : (places[type] = [place]);
}

export function updatePlaceNumber(types) {
  elements.placeNum.innerText = "";
  const numArr = types.map((type) => places[type].length);
  const totalNum = numArr.reduce((memo, curr) => memo + curr, 0);
  if (totalNum === 1) {
    elements.placeNum.innerText = "1 Place";
  } else {
    elements.placeNum.innerText = `${totalNum} Places`;
  }
}

export function addMarker(type) {
  places[type].forEach((place) => {
    const marker = new google.maps.Marker({
      map,
      title: place.place_id,
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      icon: GM_STYLES.icons[type],
    });
    markers[type] ? markers[type].push(marker) : (markers[type] = [marker]);
    marker.addListener("click", () => {
      openInfowindow(place, marker);
      scrollToCard(place);
    });
  });
}

function openInfowindow(place, marker) {
  const infowindow = new google.maps.InfoWindow({
    content: `<p>${place.name}</p>`,
  });
  infowindow.open(map, marker);
}

function scrollToCard(place) {
  const selectedCard = document.getElementById(place.place_id);
  selectedCard.scrollIntoView({ behavior: "smooth" });
}

export function showMarkers(type) {
  markers[type].forEach((marker) => marker.setMap(map));
}

export function clearMarkers() {
  Object.values(markers)
    .flat()
    .forEach((marker) => marker.setMap(null));
}

function getPlaceCardImg(place) {
  return place.photos
    ? place.photos[0].getUrl({ maxHeight: 300, maxWidth: 300 })
    : "https://via.placeholder.com/150";
}

function ratingCalc(rating) {
  const starPercentage = (rating / 5) * 100;
  return `${Math.round(starPercentage / 10) * 10}%`;
}

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getPlaceCardRating(place) {
  return place.user_ratings_total
    ? numberWithCommas(place.user_ratings_total)
    : "";
}

export function createCard(type) {
  places[type].forEach((place) => {
    const imgSrc = getPlaceCardImg(place);
    const starPercentageRounded = ratingCalc(place.rating);
    const userRatings = getPlaceCardRating(place);

    const placeCard = document.createElement("div");
    placeCard.className = "place-card";
    placeCard.id = `${place.place_id}`;
    placeCard.innerHTML = `<div class="place-content"><div class="icon icon-${type}"><i class="material-icons">local_${type}</i></div><p class="place-name">${place.name}</p><p class="place-address">${place.vicinity}</p><div class="place-rating"><div class="stars-outer"><div class="stars-inner" style="width:${starPercentageRounded}"></div></div> (${userRatings})</div></div><img class="place-img" src="${imgSrc}" alt="${place.name} photo"></div>
    `;

    elements.placeList.appendChild(placeCard);
    placeCard.addEventListener("click", () => {
      highlightMarker(place);
      showPlaceDetails(place, type);
    });
  });
}

export function clearCards() {
  elements.placeList.innerHTML = "";
}

function highlightMarker(place) {
  const selectedMarker = Object.values(markers)
    .flat()
    .find((marker) => marker.getTitle() === place.place_id);

  clearMarkers();
  selectedMarker.setMap(map);
  map.panTo(selectedMarker.getPosition());
  openInfowindow(place, selectedMarker);
}

function getPlaceDetails(place) {
  const request = { placeId: `${place.place_id}` };
  service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails(request, (result, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(result);
      } else {
        reject(status);
      }
    });
  });
}

function getPlaceHeroPhoto(photo) {
  const heroPhotoSrc = photo.getUrl({ maxHeight: 300, maxWidth: 300 });
  return `<div class="hero-photo" style="background-image: url(${heroPhotoSrc})"></div>`;
}

function getPlacePhotoGallery(photos) {
  const photoGallery = document.createElement("div");
  photoGallery.className = "photo-gallery";
  photos.forEach((photo) => {
    const imgSrc = photo.getUrl({ maxHeight: 200, maxWidth: 200 });
    photoGallery.innerHTML += `<a href="${imgSrc}" target="_blank" rel="noopener noreferrer"><img src="${imgSrc}"></a>`;
  });
  return photoGallery;
}

function getPlaceIntro(result, type) {
  return `<div class="place-intro"><div class="icon icon-${type}"><i class="material-icons">local_${type}</i></div><p class="place-name">${result.name}</p></div><p class="place-address">${result.formatted_address}</p><div class="place-contact"><p><i class="material-icons">local_phone</i> ${result.formatted_phone_number}</p><p><i class="material-icons">language</i><a href="${result.website}">${result.website}</a></p></div>`;
}

function getPlaceBizHours(hours) {
  const bizHours = hours.reduce((memo, curr) => {
    return `<p>${memo}</p>` + `<p>${curr}</p>`;
  }, "");
  return `<div class="place-hours"><h4>Business Hours</h4>${bizHours}</div>`;
}

function getPlaceReviewDiv(reviews) {
  const reviewDiv = document.createElement("div");
  reviewDiv.className = "place-reviews";
  reviewDiv.innerHTML += `<div class="review-intro"><h4>Reviews</h4></div>`;

  const reviewList = document.createElement("div");
  reviewList.className = "review-list";
  reviews.forEach((review) => {
    const reviewerRatingRounded = ratingCalc(review.rating);
    reviewList.innerHTML += `
    <div class="review-card"><div class="review-content"><p>${review.text}</p></div><div class="reviewer-rating"><div class="place-rating"><div class="stars-outer"><div class="stars-inner" style="width:${reviewerRatingRounded}"></div></div> ${review.rating}</div></div><div class="reviewer-profile"><div class="reviewer-intro"><p class="reviewer-name">${review.author_name}</p><p class="review-time">${review.relative_time_description}</p></div><img src="${review.profile_photo_url}"></div></div>
    `;
  });
  reviewDiv.appendChild(reviewList);
  return reviewDiv;
}

function getPlaceActionDiv() {
  return `<div class="place-actions"><a class="back"><i class="material-icons">arrow_back</i></a><a class="heart"><i class="material-icons">favorite</i></a></div>`;
}

async function showPlaceDetails(place, type) {
  const result = await getPlaceDetails(place);
  const placeDetails = document.createElement("div");
  placeDetails.className = "place-details";
  placeDetails.id = result.place_id;

  if (result.photos) {
    placeDetails.innerHTML += getPlaceHeroPhoto(result.photos[0]);
    if (result.photos.length > 1) {
      placeDetails.appendChild(getPlacePhotoGallery(result.photos.slice(1)));
    }
  }
  placeDetails.innerHTML += getPlaceIntro(result, type);
  if (result.weekday_text)
    placeDetails.innerHTML += getPlaceBizHours(result.weekday_text);
  placeDetails.appendChild(getPlaceReviewDiv(result.reviews));
  placeDetails.innerHTML += getPlaceActionDiv();

  elements.placeOverview.style.display = "none";
  elements.placeContainer.appendChild(placeDetails);
}

function createDirectionsPanel() {
  const directionsPanel = document.createElement("div");
  directionsPanel.id = "directionsPanel";
  directionsPanel.innerHTML += `<div class="place-actions"><a class="back"><i class="material-icons">arrow_back</i></a></div>`;
  elements.placeContainer.appendChild(directionsPanel);
  return directionsPanel;
}

export function renderRoute(placeIds) {
  removeDirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  const stopovers = placeIds.slice(1, placeIds.length - 1).map((id) => {
    return { stopover: true, location: { placeId: id } };
  });
  const request = {
    origin: { placeId: placeIds[0] },
    destination: { placeId: placeIds[placeIds.length - 1] },
    waypoints: stopovers,
    travelMode: google.maps.TravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      clearMarkers();
      directionsRenderer.setMap(map);
      elements.placeOverview.style.display = "none";
      removeItem(document.querySelector(".place-details"));
      removeItem(document.querySelector("#directionsPanel"));
      const directionsPanel = createDirectionsPanel();
      directionsRenderer.setPanel(directionsPanel);
      directionsRenderer.setDirections(result);
    } else {
      alert(status);
    }
  });
}

export function removeItem(item) {
  if (item) item.remove();
}

export function removeDirectionsRenderer() {
  if (directionsRenderer != null) {
    directionsRenderer.setMap(null);
    directionsRenderer = null;
  }
}
