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
paragraph.innerHTML = `${day} ${hour}:${minutes}`;

// Search Engeneering
function searchCity(event) {
  event.preventDefault();
  let result = document.querySelector("#city-input");
  let searchedCity = result.value;
  let units = "metric";
  let apiKey = "ee38ce771f31t049ab81b0of21a152fe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchedCity}&key=${apiKey}`;
  //api.shecodes.io/weather/v1/current?query={query}&key={key}
  https: axios.get(apiUrl).then(showTemperature);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", searchCity);

function showTemperature(response) {
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#current-city").innerHTML = response.city;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}Km/h`;
}
// Current location
function returTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  // let units = "metric";
  let apiKey = "ee38ce771f31t049ab81b0of21a152fe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

getPosition();
function getPosition() {
  navigator.geolocation.getCurrentPosition(returTemperature);
}
let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", getPosition);

// // Celsius and Farenheit
// let temperature = document.querySelector("#current-temperature");
// function changeTemperature(event) {
//   event.preventDefault();
//   if (event.target.id === "celsius-temperature") {
//     temperature.innerHTML = 27;
//   } else {
//     temperature.innerHTML = 65;
//   }
// }
// let celsius = document.querySelector("#celsius-temperature");
// celsius.addEventListener("click", changeTemperature);

// let fahrenheit = document.querySelector("#fahrenheit-temperature");
// fahrenheit.addEventListener("click", changeTemperature);
