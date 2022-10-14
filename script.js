let currentTime = new Date();
let currentDay = currentTime.getDay();
let currentHour = currentTime.getHours();
let currentMinuts = currentTime.getMinutes();

let showCurrentDay = document.querySelector(".day");
let apiKey = "c94b4d94fde0a49cb46165408b7fec3c";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let nextDay = document.querySelectorAll(".p-day");
let currentButton = document.querySelector(".current-button");
let temperature = document.querySelector(".temp");
let todayWeather = document.querySelector(".weather");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let city = document.querySelector("h3");
let formCity = document.querySelector(".form-enter-city");
let icon = document.querySelector(".image-weather-today");

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

if (currentMinuts < 10) {
  currentMinuts = `0${currentMinuts}`;
}

showCurrentDay.innerHTML = `${days[currentDay]} <span>${currentHour}:${currentMinuts}</span>`;

function searchCity(inputCity) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".enter-city-input").value;
  searchCity(inputCity);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day].slice(0, 3);
}

function displayForecast(response) {
  console.log(response.data);
  let precipitation = document.querySelector(".today-precipitatipn");
  precipitation.innerHTML = `${Math.floor(response.data.hourly[0].pop * 100)}%`;
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".day-weather");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2 each-day-weather">
<p class="p-day">${formatDay(forecastDay.dt)}</p>
<img src="images/${forecastDay.weather[0].icon}.png">
<p class="day-temp01">${Math.round(forecastDay.temp.max)} °C</p>
<p class="day-temp02">${Math.round(forecastDay.temp.min)} °C</p>
</div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinats) {
  console.log(coordinats);
  let apiKey = "8c78e9e7e9928cd1a2a6f923072c3dec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinats.lat}&lon=${coordinats.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  todayWeather.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  icon.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  document.querySelector(".enter-city-input").value = "";
  console.log(response.data);
  getForecast(response.data.coord);
}

formCity.addEventListener("submit", showCity);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

currentButton.addEventListener("click", getCurrentPosition);

searchCity("London");
