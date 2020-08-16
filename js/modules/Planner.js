import { elements } from './elements.js';

const apiKey = '2f066f1da18054ca89663693707a364b';
const baseURL = 'https://api.openweathermap.org/data/2.5/onecall';

let weatherData;
const dateRange = [];

// lat: 38.9071923
// lon: -77.0368707

export const getWeather = (lat, lon) => {
  fetch(`${baseURL}?lat=${lat}&lon=${lon}&
    exclude=current,minutely,hourly&appid=${apiKey}&units=imperial`)
    .then(resp => resp.json())
    .then(json => {
      weatherData = json.daily.filter(dailyWeather => dateRange.includes((new Date(dailyWeather.dt * 1000)).toLocaleDateString()));
    })
    .catch(err => console.log(err));
}

export const getDates = () => {
  let startDate = new Date(elements.startDate.value.replace(/-/g, '\/'));
  const endDate = new Date(elements.endDate.value.replace(/-/g, '\/'));
  while(startDate <= endDate) {
    const date = (new Date(startDate)).toLocaleDateString();
    dateRange.push(date);
    startDate.setDate(startDate.getDate() + 1);
  }
}

// const 
// const milliseconds = 1575909015 * 1000 // 1575909015000

// const dateObject = new Date(milliseconds)

// [
//   {
//     "dt": 1597510800, //////////////
//     "sunrise": 1597486937,
//     "sunset": 1597536182,
//     "temp": {          /////////////
//       "day": 71.71,
//       "min": 70.45,
//       "max": 71.71,
//       "night": 70.45,
//       "eve": 71.71,
//       "morn": 71.71
//     },
//     "feels_like": {
//       "day": 74.57,
//       "night": 71.26,
//       "eve": 74.57,
//       "morn": 74.57
//     },
//     "pressure": 1015,
//     "humidity": 88,
//     "dew_point": 67.96,
//     "wind_speed": 6.69,
//     "wind_deg": 87,
//     "weather": [
//       {
//         "id": 501,
//         "main": "Rain",
//         "description": "moderate rain",
//         "icon": "10d"
//       }
//     ],
//     "clouds": 90,
//     "pop": 0.93,
//     "rain": 4.54,
//     "uvi": 9.25
//   },
//   {
//     "dt": 1597597200,
//     "sunrise": 1597573392,
//     "sunset": 1597622504,
//     "temp": {
//       "day": 73.27,
//       "min": 68.07,
//       "max": 76.71,
//       "night": 69.44,
//       "eve": 73.35,
//       "morn": 68.07
//     },
//     "feels_like": {
//       "day": 74.86,
//       "night": 73.72,
//       "eve": 78.13,
//       "morn": 67.48
//     },
//     "pressure": 1012,
//     "humidity": 75,
//     "dew_point": 65.07,
//     "wind_speed": 6.46,
//     "wind_deg": 52,
//     "weather": [
//       {
//         "id": 501,
//         "main": "Rain",
//         "description": "moderate rain",
//         "icon": "10d"
//       }
//     ],
//     "clouds": 99,
//     "pop": 1,
//     "rain": 11.85,
//     "uvi": 8.56
//   },
//   {
//     "dt": 1597683600,
//     "sunrise": 1597659847,
//     "sunset": 1597708824,
//     "temp": {
//       "day": 82.8,
//       "min": 70.61,
//       "max": 84.18,
//       "night": 73.4,
//       "eve": 78.21,
//       "morn": 70.61
//     },
//     "feels_like": {
//       "day": 82.27,
//       "night": 75.06,
//       "eve": 80.2,
//       "morn": 74.08
//     },
//     "pressure": 1012,
//     "humidity": 51,
//     "dew_point": 63.28,
//     "wind_speed": 8.66,
//     "wind_deg": 314,
//     "weather": [
//       {
//         "id": 500,
//         "main": "Rain",
//         "description": "light rain",
//         "icon": "10d"
//       }
//     ],
//     "clouds": 41,
//     "pop": 0.24,
//     "rain": 0.15,
//     "uvi": 8.23
//   },
//   {
//     "dt": 1597770000,
//     "sunrise": 1597746302,
//     "sunset": 1597795144,
//     "temp": {
//       "day": 85.75,
//       "min": 71.4,
//       "max": 85.75,
//       "night": 73.96,
//       "eve": 77.07,
//       "morn": 71.4
//     },
//     "feels_like": {
//       "day": 83.75,
//       "night": 75.34,
//       "eve": 77.4,
//       "morn": 70.93
//     },
//     "pressure": 1013,
//     "humidity": 34,
//     "dew_point": 54.28,
//     "wind_speed": 5.79,
//     "wind_deg": 329,
//     "weather": [
//       {
//         "id": 500,
//         "main": "Rain",
//         "description": "light rain",
//         "icon": "10d"
//       }
//     ],
//     "clouds": 0,
//     "pop": 0.33,
//     "rain": 0.13,
//     "uvi": 8.12
//   },
//   {
//     "dt": 1597856400,
//     "sunrise": 1597832757,
//     "sunset": 1597881462,
//     "temp": {
//       "day": 73.45,
//       "min": 66.9,
//       "max": 77.45,
//       "night": 70.54,
//       "eve": 72.86,
//       "morn": 66.9
//     },
//     "feels_like": {
//       "day": 75.63,
//       "night": 75.13,
//       "eve": 76.5,
//       "morn": 68
//     },
//     "pressure": 1012,
//     "humidity": 74,
//     "dew_point": 64.92,
//     "wind_speed": 5.26,
//     "wind_deg": 83,
//     "weather": [
//       {
//         "id": 501,
//         "main": "Rain",
//         "description": "moderate rain",
//         "icon": "10d"
//       }
//     ],
//     "clouds": 98,
//     "pop": 0.91,
//     "rain": 9.56,
//     "uvi": 7.95
//   },
//   {
//     "dt": 1597942800,
//     "sunrise": 1597919212,
//     "sunset": 1597967779,
//     "temp": {
//       "day": 88.36,
//       "min": 71.92,
//       "max": 88.36,
//       "night": 73.4,
//       "eve": 78.85,
//       "morn": 71.92
//     },
//     "feels_like": {
//       "day": 89.85,
//       "night": 77.23,
//       "eve": 82.51,
//       "morn": 76.05
//     },
//     "pressure": 1013,
//     "humidity": 40,
//     "dew_point": 61.59,
//     "wind_speed": 3.78,
//     "wind_deg": 344,
//     "weather": [
//       {
//         "id": 500,
//         "main": "Rain",
//         "description": "light rain",
//         "icon": "10d"
//       }
//     ],
//     "clouds": 14,
//     "pop": 0.23,
//     "rain": 0.15,
//     "uvi": 7.97
//   },
//   {
//     "dt": 1598029200,
//     "sunrise": 1598005667,
//     "sunset": 1598054096,
//     "temp": {
//       "day": 88.54,
//       "min": 74.1,
//       "max": 88.54,
//       "night": 74.79,
//       "eve": 82.13,
//       "morn": 74.1
//     },
//     "feels_like": {
//       "day": 89.96,
//       "night": 77.7,
//       "eve": 86.2,
//       "morn": 76.86
//     },
//     "pressure": 1014,
//     "humidity": 43,
//     "dew_point": 63.52,
//     "wind_speed": 5.48,
//     "wind_deg": 239,
//     "weather": [
//       {
//         "id": 500,
//         "main": "Rain",
//         "description": "light rain",
//         "icon": "10d"
//       }
//     ],
//     "clouds": 1,
//     "pop": 0.79,
//     "rain": 2.03,
//     "uvi": 8.42
//   },
//   {
//     "dt": 1598115600,
//     "sunrise": 1598092122,
//     "sunset": 1598140411,
//     "temp": {
//       "day": 91.85,
//       "min": 74.17,
//       "max": 91.85,
//       "night": 76.78,
//       "eve": 82.2,
//       "morn": 74.17
//     },
//     "feels_like": {
//       "day": 91.09,
//       "night": 79.84,
//       "eve": 82.49,
//       "morn": 77.86
//     },
//     "pressure": 1011,
//     "humidity": 36,
//     "dew_point": 61.7,
//     "wind_speed": 7.85,
//     "wind_deg": 222,
//     "weather": [
//       {
//         "id": 803,
//         "main": "Clouds",
//         "description": "broken clouds",
//         "icon": "04d"
//       }
//     ],
//     "clouds": 73,
//     "pop": 0.44,
//     "uvi": 7.86
//   }
// ]