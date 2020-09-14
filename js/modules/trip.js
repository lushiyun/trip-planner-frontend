import * as map from "./map.js";
import { elements } from "./elements.js";

export default class Trip {
  constructor({ city, lat, lng, id, days }) {
    this.city = city;
    this.lat = lat;
    this.lng = lng;
    this.id = id;
    this.days = days;

    this.tripList = document.querySelector(".itinerary-list");
    this.render();
  }

  dates() {
    return this.days
      .filter((day) => day.trip_id == this.id)
      .map((day) => day.date);
  }

  displayTrip = () => {
    const center = { lat: parseFloat(this.lat), lng: parseFloat(this.lng) };
    map.clearMarkers();
    map.clearCards();
    document
      .querySelectorAll(".selected")
      .forEach((filter) => filter.classList.remove("selected"));
    map.initMap(center);

    Array.from(document.querySelectorAll(".daily")).forEach((dailyPlanner) =>
      dailyPlanner.remove()
    ); 
    if(document.querySelector(".planner-actions")) document.querySelector(".planner-actions").remove();

    this.days
      .filter((day) => day.trip_id == this.id)
      .forEach((day) => {
        const plannerBox = day.renderElement();
        elements.plannerContent.appendChild(plannerBox);
      });

    document.querySelector("#search-modal").style.display = "none";
  };

  render() {
    const dates = this.dates();
    const startDate = new Date(Math.min(...dates)).toLocaleDateString();
    const endDate = new Date(Math.max(...dates)).toLocaleDateString();

    const element = document.createElement("li");
    element.className = "trip-itinerary";
    element.id = `trip-${this.id}`;
    element.innerText = `${this.city} | ${startDate} - ${endDate}`;
    element.addEventListener("click", this.displayTrip);
    this.tripList.appendChild(element);
  }
}
