import { elements } from './elements.js';

const apiKey = '2f066f1da18054ca89663693707a364b';
const baseURL = 'https://api.openweathermap.org/data/2.5/onecall';

const dateRange = [];

export const getDates = () => {
  let startDate = new Date(elements.startDateInput.value.replace(/-/g, '\/'));
  const endDate = new Date(elements.endDateInput.value.replace(/-/g, '\/'));
  while(startDate <= endDate) {
    const date = (new Date(startDate)).toLocaleDateString();
    dateRange.push(date);
    startDate.setDate(startDate.getDate() + 1);
  }
}

export const getWeather = (lat, lon) => {
  fetch(`${baseURL}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=imperial`)
    .then(resp => resp.json())
    .then(json => showDailyPlanners(json.daily))
    .catch(err => err);
}

const showDailyPlanners = (data) => {
  const weatherData = {};
  data.forEach(dailyWeather => {
    const date = (new Date(dailyWeather.dt * 1000)).toLocaleDateString();
    if(dateRange.includes(date)) {
      weatherData[date] = {
        minTemp: dailyWeather.temp.min,
        maxTemp: dailyWeather.temp.max,
        iconURL: `http://openweathermap.org/img/wn/${dailyWeather.weather[0].icon}@2x.png`
      };
    }
  })

  dateRange.forEach(date => {
    const plannerBox = document.createElement('div');
    plannerBox.className = 'planner-box daily';
    plannerBox.id = date;

    const title = document.createElement('div');
    title.className = 'title';
    title.innerHTML += `<p class="date">${date}</p>`;
    const weatherInfo = weatherData[date];
    if(weatherInfo) {
      const weatherDiv = document.createElement('div');
      weatherDiv.className = 'weather';
      weatherDiv.innerHTML += `<span>${weatherInfo.maxTemp}&#176; / ${weatherInfo.minTemp}&#176;</span><img src="${weatherInfo.iconURL}">`;
      title.appendChild(weatherDiv);
    }
    plannerBox.appendChild(title);

    const plannerList = document.createElement('div');
    plannerList.className = 'planner-list';
    plannerBox.appendChild(plannerList);
    elements.plannerContent.appendChild(plannerBox);
  })
  elements.plannerContent.innerHTML += `<div class="planner-actions"><a class="clear" title="Reset"><i class="material-icons">layers_clear</i></a><a class="save" title="Save"><i class="material-icons">save</i></a></div>`
}

export const clearDailyPlanners = () => {
  document.querySelectorAll('.daily').forEach(dailyPlanner => dailyPlanner.remove());
}

export const clearPlaceItems = () => {
  document.querySelectorAll('.list-item').forEach(placeItem => placeItem.remove());
}

export const clearDateRange = () => {
  dateRange = [];
}