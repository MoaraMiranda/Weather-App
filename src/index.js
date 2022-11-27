// Current Date
Date.prototype.getFullMinutes = function () {
  if (this.getMinutes() < 10) {
    return "0" + this.getMinutes();
  }
  return this.getMinutes();
};
let currentDate = new Date();

let paragraph = document.querySelector("p");
let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentDate.getFullMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
paragraph.innerHTML = `${day} - ${hour}:${minutes}`;

//Global variables
let units = "metric"; // metric or imperial
let typeLastCall = "location"; // location or search
let apiKey = "ee38ce771f31t049ab81b0of21a152fe";

// Search Engeneering
function searchCity(event) {
  if (event) {
    event.preventDefault();
  }
  typeLastCall = "search";
  let result = document.querySelector("#city-input");
  let searchedCity = result.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchedCity}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", searchCity);

function formatDayForcast(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}


function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col weather-forecast-day">
       ${formatDayForcast(forecastDay.time)}
        <div class="col">
           <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
             forecastDay.condition.icon
           }.png" alt="weather-description" />
        </div>
        <div class="col">
          <spam class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temperature.maximum
          )}°</spam>
          <spam class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</spam>
        </div>
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast (coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#current-city").innerHTML = response.data.city;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.temperature.humidity}%`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}Km/h`;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  var background = document.querySelector(".bg");
  background.style.backgroundImage = `url(images/${response.data.condition.icon}.jpg)`;
  
   getForecast(response.data.coordinates);
}
// Current location
function setLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition() {
  typeLastCall = "location";
  navigator.geolocation.getCurrentPosition(setLocation);
}
let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", getPosition);

// // Celsius and Farenheit
let temperature = document.querySelector("#current-temperature");
function changeTemperature(event) {
  event.preventDefault();
  if (event.target.id === "celsius-temperature") {
    units = "metric";
  } else {
    units = "imperial";
  }

  // chamar funcao searchCity ou getPosition dependendo de qual foi chamada por ultimo passando metric como unit
  if (typeLastCall === "search") {
    searchCity();
  } else {
    getPosition();
  }
}
let celsius = document.querySelector("#celsius-temperature");
celsius.addEventListener("click", changeTemperature);

let fahrenheit = document.querySelector("#fahrenheit-temperature");
fahrenheit.addEventListener("click", changeTemperature);

// Start the application
getPosition();
