export default class Place {
  static all = []

  constructor({name, place_id, type, id, day_id}) {
    this.name = name;
    this.place_id = place_id;
    this.type = type;
    this.id = id;
    this.day_id = day_id;

    Place.all.push(this);
  }

  static findById(id) {
    return Place.all.find(place => place.id == id);
  }

  createPlaceItem() {
    const placeItem = document.createElement('div');
    placeItem.className = 'list-item';
    placeItem.setAttribute('data-place-id', this.place_id);
    placeItem.setAttribute('draggable', true);
    placeItem.innerHTML = `
    <div class="item-content">
      <div class="icon icon-${this.type}">
        <i class="material-icons">local_${this.type}</i>
      </div>
      <p class="place-name">${this.name}</p>
    </div>`;

    return placeItem;
  }
}