import { elements } from "./modules/elements.js";
import * as map from "./modules/map.js";
import * as planner from "./modules/planner.js";
import TripAdapter from "./modules/TripAdapter.js";

export const PLACE_TYPES = {
  see: "tourist_attraction",
  dining: "restaurant",
  cafe: "cafe",
  bar: "bar",
  hotel: "lodging",
  mall: "shopping_mall",
};

const state = {
  cityName: null,
  mapCenter: null,
  selectedTypes: [],
};

const tripAdapter = new TripAdapter();

/*
 ****** Global Controller *******
 */

document.addEventListener("DOMContentLoaded", () => {
  showItem(elements.initModal);
  hideItem(elements.itineraryContainer);
  showItem(elements.initContentContainer);
  tripAdapter.fetchTrips();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-itineraries")) {
    showItem(elements.initModal);
    hideItem(elements.initContentContainer);
    showItem(elements.itineraryContainer);
  }
});

const hideItem = (elem) => {
  elem.style.display = "none";
};

const showItem = (elem) => {
  elem.removeAttribute("style");
};

// Listen for place change in google searchbox
const searchBox = new google.maps.places.SearchBox(elements.cityInput);
searchBox.addListener("places_changed", () => {
  const city = searchBox.getPlaces()[0];
  if (city === null) return;
  state.cityName = city.name;
  state.mapCenter = city.geometry.location;
});

/*
 ****** Init Modal Controller *******
 */

elements.initModal.addEventListener("click", (e) => {
  if (e.target.id === "itinerary-back") {
    showItem(elements.initContentContainer);
    hideItem(elements.itineraryContainer);
  }
  e.preventDefault();
});

elements.searchSubmit.addEventListener("click", (e) => {
  controlInit(e);
  e.preventDefault();
});

const controlInit = (e) => {
  try {
    planner.getDates();
    map.initMap(state.mapCenter);

    // set selected types to all available types - google map api only supports place search one type at a time
    state.selectedTypes = Object.keys(PLACE_TYPES);

    loadMapMarkersAndPlaces();

    // call weather forecast from API for destination and render weather info in daily planners
    planner.getWeather(state.mapCenter.lat(), state.mapCenter.lng());

    elements.initForm.reset();
    hideItem(elements.initModal);
  } catch {
    alert("Something went wrong. Select your destination again from the menu.");
  }
  e.preventDefault();
};

const loadMapMarkersAndPlaces = async () => {
  for (const type of state.selectedTypes) {
    const results = await map.getPlaces(
      state.mapCenter,
      8000,
      PLACE_TYPES[type]
    );
    results.forEach((place) => map.savePlace(place, type));
    map.addMarker(type);
    map.showMarkers(type);
    map.createCard(type);
  }
  map.updatePlaceNumber(state.selectedTypes);
};

/*
 ****** Place Controller *******
 */

elements.placeContainer.addEventListener("click", (e) => {
  // when place container shows place overviews
  if (e.target.closest(".filter-buttons")) {
    selectPlaceFilters(e);
  } else if (e.target.closest("#filter-actions")) {
    applyFilterAction(e);

    // when place container shows place details and routes
  } else if (e.target.closest(".back")) {
    loadInitPage();
  } else if (e.target.closest(".heart")) {
    planner.addPlaceToPlanner();
  }
});

const selectPlaceFilters = (e) => {
  const filterLi = e.target.closest(".filter-li");
  if (filterLi) filterLi.childNodes[0].classList.toggle("selected");
};

const clearFilterSelection = () => {
  document
    .querySelectorAll(".selected")
    .forEach((filter) => filter.classList.remove("selected"));
};

const updateTypeSelection = () => {
  const selectedElems = Array.from(document.querySelectorAll(".selected"));
  if (selectedElems.length === 0) {
    state.selectedTypes = Object.keys(PLACE_TYPES);
  } else {
    state.selectedTypes = selectedElems.map((element) => element.parentNode.id);
  }
};

const applyFilterAction = (e) => {
  const applyAction = e.target.closest("#apply-filter");
  const clearAction = e.target.closest("#clear-filter");
  if (!applyAction && !clearAction) return;

  if (clearAction) {
    clearFilterSelection();
  }
  updateTypeSelection();

  map.clearMarkers();
  state.selectedTypes.forEach((type) => map.showMarkers(type));
  map.clearCards();
  state.selectedTypes.forEach((type) => map.createCard(type));
  map.updatePlaceNumber(state.selectedTypes);
  e.preventDefault();
};

const loadInitPage = () => {
  map.removeItem(document.querySelector(".place-details"));
  map.removeItem(document.querySelector("#directionsPanel"));
  showItem(document.querySelector(".place-overview"));

  map.removeDirectionsRenderer();
  map.clearMarkers();
  // googleMap.initMap(state.mapCenter);

  if (state.selectedTypes) {
    state.selectedTypes.forEach((type) => map.showMarkers(type));
  }

  // remove clicked style from all planner boxes in the planner section
  removeAllClickedStyle();
};

/*
 ****** Planner Controller *******
 */

elements.plannerContent.addEventListener("click", (e) => {
  // on place items
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.parentNode.remove();
  } else if (e.target.classList.contains("duplicate")) {
    duplicateListItem(e);

    // on planner box
  } else if (e.target.closest(".planner-box")) {
    const selectedBox = e.target.closest(".planner-box");
    removeAllClickedStyle();
    addClickedStyle(selectedBox.querySelector(".title"));
    const placeIds = getPlaceIds(e);
    if (placeIds) map.renderRoute(placeIds);

    // on planner action links
  } else if (e.target.closest(".save")) {
    const tripObj = createTripObj();
    // http post trip data to Rails backend
    tripAdapter.newTrip(tripObj);
  }
});

const duplicateListItem = (e) => {
  const itemNode = e.target.parentNode.parentNode;
  const clone = itemNode.cloneNode(true);
  itemNode.after(clone);
};

const addClickedStyle = (elm) => elm.classList.add("clicked");

const removeClickedStyle = (elm) => elm.classList.remove("clicked");

const removeAllClickedStyle = () => {
  Array.from(document.querySelectorAll(".title")).forEach((title) =>
    removeClickedStyle(title)
  );
};

const getPlaceIds = (e) => {
  const titleElm = e.target.closest(".title");
  const itemElms = titleElm.nextElementSibling.children
    ? [...titleElm.nextElementSibling.children]
    : null;
  if (!itemElms || itemElms.length < 2) return null;
  return itemElms.map((item) => item.dataset.placeId);
};

// arrange triple nested data structure for HTTP post action
const createTripObj = () => {
  const days_attributes = [...document.querySelectorAll(".daily")].map(
    (plannerBox) => {
      const dateStr = plannerBox.querySelector(".date").innerText;
      const date = new Date(dateStr).toUTCString();

      const places_attributes = [
        ...plannerBox.querySelectorAll(".list-item"),
      ].map((placeItem) => {
        const name = placeItem.querySelector(".place-name").innerText;
        const place_id = placeItem.dataset.placeId;
        const category = placeItem
          .querySelector(".material-icons")
          .innerText.split("_")[1];
        return { name, place_id, category };
      });

      return { date, places_attributes };
    }
  );

  const city = state.cityName;
  const lat = state.mapCenter.lat();
  const lng = state.mapCenter.lng();

  return {
    trip: { city, lat, lng, days_attributes },
  };
};
