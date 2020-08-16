import { elements } from './elements.js';
import * as googleMap from './googleMap.js';

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
    plannerBox.className = 'planner-box';
    plannerBox.id = date;

    const title = document.createElement('div');
    title.className = 'title';
    title.innerHTML += `<p>${date}</p>`;
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

    plannerList.addEventListener('dragover', sortAndDisplayItem);

    title.addEventListener('click', (e) => {
      plannerBox.classList.add('clicked');  // TODO: add clicked styling
      googleMap.renderRoute(e);
    })
  })
}

export const addPlaceToPlanner = (place, type) => {
  const placeItem = document.createElement('div');
  placeItem.className = 'list-item';
  placeItem.id = place.place_id;
  placeItem.setAttribute('draggable', true);
  placeItem.innerHTML = `<div class="item-content"><div class="icon icon-${type}"><i class="material-icons">local_${type}</i></div><p class="place-name">${place.name}</p></div><div class="item-actions"><i class="material-icons delete">delete</i><i class="material-icons duplicate">add_box</i></div>`;
  elements.placeBucket.querySelector('.planner-list').appendChild(placeItem);

  placeItem.addEventListener('dragstart', () => {
    placeItem.classList.add('dragging');
  })
  placeItem.addEventListener('dragend', () => {
    placeItem.classList.remove('dragging');
  })
}

const sortAndDisplayItem = (e) => {
  const container = e.target.closest('.planner-list');
  const item = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(container, e.clientY);
  if(afterElement) {
    container.insertBefore(item, afterElement);
  } else {
    container.appendChild(item);
  }
  e.preventDefault();
}

const getDragAfterElement = (container, y) => {
  const draggableElms = [...container.querySelectorAll('.list-item:not(.dragging)')];
  return draggableElms.reduce((closest, child) => {
    const rect = child.getBoundingClientRect();
    const offset = y - rect.top - rect.height / 2;
    if(offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}