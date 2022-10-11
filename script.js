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

//nextDay.forEach(function (day, i) {
// day.innerHTML = days[currentDay + i + 1].slice(0, 3);
//});

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

function showTemperature(response) {
  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`;
  todayWeather.innerHTML = `${response.data.weather[0].main}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  document.querySelector(".enter-city-input").value = "";
}

formCity.addEventListener("submit", showCity);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

currentButton.addEventListener("click", getCurrentPosition);

searchCity("London");
