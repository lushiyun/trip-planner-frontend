import Day from './day.js';
import * as googleMap from './Map.js';
import { elements } from './elements.js';

export default class Trip {
  static all = []

  constructor({city, lat, lng, id}) {
    this.city = city;
    this.lat = lat;
    this.lng = lng;
    this.id = id;

    this.element = document.createElement('li');
    this.element.className = 'trip-itinerary';
    this.element.id = `trip-${this.id}`;
    this.tripList = document.querySelector('.itinerary-list');

    Trip.all.push(this);
  }

  static findById(id) {
    return Trip.all.find(trip => trip.id == id);
  }

  days() {
    return Day.all.filter(day => day.trip_id == this.id);
  }

  dates() {
    return this.days().map(day => day.date);
  }

  startDate() {
    return new Date(Math.min.apply(null, this.dates()));
  }

  endDate() {
    return new Date(Math.max.apply(null, this.dates()));
  }

  places() {
    return this.days().map(day => day.places());
  }

  fullRender() {
    this.element.innerText = `${this.city} | ${this.startDate().toLocaleDateString()} - ${this.endDate().toLocaleDateString()}`;
    return this.element;
  }

  addToDom() {
    this.tripList.appendChild(this.fullRender());
    this.addEventListeners();
  }

  addEventListeners() {
    this.element.addEventListener('click', this.displayTrip);
  }

  displayTrip = () => {
    const center = {lat: parseFloat(this.lat), lng: parseFloat(this.lng)};
    googleMap.clearMarkers();
    googleMap.clearCards();
    document.querySelectorAll('.selected').forEach(filter => filter.classList.remove('selected'));
    googleMap.initMap(center);

    Array.from(document.querySelectorAll('.daily')).forEach(dailyPlanner => dailyPlanner.remove());
    document.querySelector('.planner-actions').remove();

    this.days().forEach(day => {
      const plannerBox = day.createPlannerBox();
      elements.plannerContent.appendChild(plannerBox); 
    });

    document.querySelector('#search-modal').style.display = 'none';
  }
}