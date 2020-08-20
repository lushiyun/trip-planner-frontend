class Trip {
  static all = []

  constructor({city, lat, lng, id}) {
    this.city = city;
    this.lat = lat;
    this.lng = lng;
    this.id = id;

    this.element = document.createElement('div');
    this.element.className = 'trip-intro';
    this.element.id = `trip-${this.id}`

    Trip.all.push(this);
  }

  fullRender() {
    this.element.innerHTML = ``
  }
}