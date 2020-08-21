import Place from './place.js';

export default class Day {
  static all = []

  constructor({id, date, trip_id}) {
    this.id = id;
    this.date = date;
    this.trip_id = trip_id;

    Day.all.push(this);
  }

  static findById(id) {
    return Day.all.find(day => day.id == id);
  }

  places() {
    return Place.all.filter(place => place.day_id == this.id);
  }

  createPlannerBox() {
    const dateStr = this.date.toLocaleDateString();
    const plannerBox = document.createElement('div');
    plannerBox.className = 'planner-box daily';
    plannerBox.id = dateStr;
    plannerBox.innerHTML = `<div class="title"><p class="date">${dateStr}</p></div>`

    const plannerList = document.createElement('div');
    plannerList.className = 'planner-list';
    this.places().forEach(place => {
      const placeItem = place.createPlaceItem();
      plannerList.appendChild(placeItem);
    });
    plannerBox.appendChild(plannerList);

    return plannerBox;
  }
}