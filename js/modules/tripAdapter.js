export default class TripAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/trips'
  }

  // fetchTrips() {
  //   fetch(this.baseUrl)
  //     .then(res => res.json())
  //     .then(json => {
  //       json.data.forEach(tripObj => {
          
  //       })
  //     })
  // }

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
      .then();
  }

  // sanitizeAndAddTrip(tripObj) {
  //   const sanitized = { }
  //   new Trip()
  // }
}