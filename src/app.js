
let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function showFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#temperature");
  tempFahrenheit.innerHTML = `66`;
}
let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", showFahrenheit);

function showWeather(response) {
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

function searchLocation(position) {
  let apiKey = '7d51494004d10e147e185b78d055e0e0'; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation)

function search(city) {
  let apiKey = "7d51494004d10e147e185b78d055e0e0";
  let apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

