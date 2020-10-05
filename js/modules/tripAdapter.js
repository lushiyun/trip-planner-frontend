import Trip from "./Trip.js";
import Day from "./Day.js";
import Place from "./Place.js";

export default class TripAdapter {
  places = [];
  days = [];
  trips = [];

  constructor() {
    this.baseUrl = "https://trip-lanner.herokuapp.com/trips";
  }

  fetchTrips() {
    fetch(this.baseUrl)
      .then((res) => res.json())
      .then((json) => this.updateState(json))
      .catch((err) => alert(err));
  }

  newTrip(tripObj) {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(tripObj),
    };
    fetch(this.baseUrl, configObj)
      .then((res) => res.json())
      .then((json) => this.updateState(json))
      .then(alert('Trip saved successfully. Check existing itineraries.'))
  }
  
  updateState(json) {
    const placeObjs = json.included.filter((obj) => obj.type === "place");
    placeObjs.forEach((placeObj) => this.addPlace(placeObj));

    const dayObjs = json.included.filter((obj) => obj.type === "day");
    dayObjs.forEach((dayObj) => this.addDay(dayObj));

    json.data.forEach(
      (tripData) =>
        new Trip({ ...tripData.attributes, id: tripData.id, days: this.days })
    );
  }

  addDay(data) {
    this.days.push(
      new Day({
        id: data.id,
        date: new Date(data.attributes.date.replace(/-/g, "/")),
        trip_id: data.relationships.trip.data.id,
        places: this.places,
      })
    );
  }

  addPlace(data) {
    this.places.push(
      new Place({
        name: data.attributes.name,
        place_id: data.attributes.place_id,
        type: data.attributes.category,
        id: data.id,
        day_id: data.relationships.day.data.id,
      })
    );
  }
}
