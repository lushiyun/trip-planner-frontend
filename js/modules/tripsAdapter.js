class TripsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/trips'
  }

  fetchItems() {
    fetch(this.baseUrl)
      .then(res => res.json())
      .then(json => {
        json.data.forEach((el) => {
          
        })
      })
  }
}