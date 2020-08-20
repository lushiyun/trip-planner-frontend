import Day from './day.js';
import * as googleMap from './Map.js';

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

  fullRender() {
    this.element.innerText = `${this.city} | ${this.startDate().toLocaleDateString()} - ${this.endDate().toLocaleDateString()}`;
    return this.element;
  }

  addToDom() {
    this.tripList.appendChild(this.fullRender());
    this.addEventListeners('click', this.displayTrip);
  }
}