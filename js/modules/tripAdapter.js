import Trip from './trip.js';
import Day from './day.js';
import Place from './place.js';

export default class TripAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/trips'
  }

  fetchTrips() {
    fetch(this.baseUrl)
      .then(res => res.json())
      .then(json => this.parseAndAddIndex(json))
      .catch(err => alert(err));
  }

  parseAndAddIndex(json) {
    json.data.forEach(tripObj => this.addTripInstance(tripObj));
    this.addIncludedInstances(json);
    Trip.all.forEach(trip => trip.addToDom());
  }

  newTrip(tripObj) {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(tripObj)
    }
    fetch(this.baseUrl, configObj)
      .then(res => res.json())
      .then(json => this.parseAndAddElement(json));
  }

  parseAndAddElement(json) {
    this.addTripInstance(json.data);
    this.addIncludedInstances(json);
    const trip = Trip.findById(json.data.id);
    trip.addToDom();
    alert('Trip saved successfully');
  }

  addIncludedInstances(data) {
    const dayObjs = data.included.filter(obj => obj.type === 'day');
    dayObjs.forEach(dayObj => this.addDayInstance(dayObj));

    const placeObjs = data.included.filter(obj => obj.type === 'place');
    placeObjs.forEach(placeObj => this.addPlaceInstance(placeObj));
  }

  addTripInstance(data) {
    new Trip({...data.attributes, id: data.id})
  }

  addDayInstance(data) {
    new Day({ id: data.id, date: new Date(data.attributes.date.replace(/-/g, '\/')), trip_id: data.relationships.trip.data.id })
  }

  addPlaceInstance(data) {
    new Place({ name: data.attributes.name, place_id: data.attributes.place_id, type: data.attributes.category, id: data.id, day_id: data.relationships.day.data.id });
  }
}