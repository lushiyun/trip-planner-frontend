# Trip Planner Frontend

This is a trip planning app that displays daily weather and routing for all cities in the world:
- Map popular places for destination city entered by user, powered by Google Maps JS library
  - Custom map markers and filters for six place types: restaurants, cafes, hotels, tourist attractions, shopping malls, and bars
  - Place overview cards with scrolling when user clicks on map marker
  - Place detail information with address, business hours and reviews
- Daily trip planner for date range entered by user, powered by Open Weather Map API
  - Weather forecast for each day (supported 7 days into the future)
  - Place saving into daily planner on click
  - Duplicate, delete, as well as Drag and drop places in daily planners to sequence them
- Daily routing on map with directions on click
- Itinerary saving and reviewing, powered by Rails API

The saving function is supported by the [Trip Planner Backend](https://github.com/lushiyun/trip-planner-backend) built with Rails.

## Demonstration

[Demo the project in production](https://triplanner.netlify.app/)

[Watch this video demo on how to use the app](https://youtu.be/W2T1yYp9wtI)

[Read my blog post about Drag & Drop Locations to Render Routes with Google Maps JS Library](https://medium.com/@lushiyun/drag-and-drop-to-sort-locations-and-render-routes-javascript-and-google-maps-api-164475298cce)

[Read my blog post about Working with Nested Resources in API](https://medium.com/@lushiyun/rails-api-for-triple-nested-resources-with-fast-json-api-and-javascript-frontend-6ca1e97eb00a)

[Check out my portfolio for my other projects](https://www.shiyunlu.com/)


## Built With

  - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Vanilla JavaScript for functionality
  - [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Used for content structure
  - [Sass](https://sass-lang.com/) - Used for content presentation
  - [Google Maps JS Library](https://developers.google.com/maps/documentation/javascript/overview) - Used for mapping and routing
  - [Open Weather Map API](https://openweathermap.org/) - Used for daily weather forecasting

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/lushiyun/c8af9e2f2d6470468cfc37aa28f6edeb) for details on my code of conduct, and the process for submitting pull requests.

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/lushiyun/trip-planner-frontend/tags).

## Author

  - **Shiyun Lu** - *Developed the app* -
    [lushiyun](https://github.com/lushiyun)

## License

This project is licensed under the MIT License
