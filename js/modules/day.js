export default class Day {
  constructor({ id, date, trip_id, places }) {
    this.id = id;
    this.date = date;
    this.trip_id = trip_id;
    this.places = places;
  }

  renderElement() {
    const dateStr = this.date.toLocaleDateString();
    const plannerBox = document.createElement("div");
    plannerBox.className = "planner-box daily";
    plannerBox.innerHTML = `<div class="title"><p class="date">${dateStr}</p></div>`;

    const plannerList = document.createElement("div");
    plannerList.className = "planner-list";
    this.places
      .filter((place) => place.day_id == this.id)
      .forEach((place) => {
        const placeItem = place.renderElement();
        plannerList.appendChild(placeItem);
      });
    plannerBox.appendChild(plannerList);

    return plannerBox;
  }
}
