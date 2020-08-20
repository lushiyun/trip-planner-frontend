export default class Place {
  static all = []

  constructor({name, place_id, type, id, day_id}) {
    this.name = name;
    this.place_id = place_id;
    this.type = type;
    this.id = id;
    this.day_id = day_id;
  }

  static findById(id) {
    return Place.all.find(place => place.id == id);
  }

  get day() {
    return Day.all.find(day => day.id == this.day_id);
  }
}