export default class Day {
  static all = []

  constructor({id, date, trip_id}) {
    this.id = id;
    this.date = date;
    this.trip_id = trip_id;
  }

  static findById(id) {
    return Day.all.find(day => day.id == id);
  }

  get trip() {
    return Trip.all.find(trip => trip.id == this.trip_id);
  }

  places() {
    return Place.all.filter(place => place.day_id == this.id);
  }
}