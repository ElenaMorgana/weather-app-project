
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}


function showWeather(response) {

tempCelsius = response.data.main.temp ;
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(tempCelsius);
document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000); 
document.querySelector('#icon').setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
document.querySelector('#icon').setAttribute("alt", response.data.weather[0].description);
}

function showFahrenheit(event) {
  event.preventDefault();
let fahrenheitTemperature = (tempCelsius * 9) / 5 + 32;
let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
tempFahrenheitLink.classList.add("active")
 tempCelsiusLink.classList.remove("active");
}

function showCelsius (event) {
  event.preventDefault();
 document.querySelector("#temperature").innerHTML = Math.round(tempCelsius);
 tempFahrenheitLink.classList.remove("active")
 tempCelsiusLink.classList.add("active");
}
  
  
let tempCelsius = null;

let tempFahrenheitLink = document.querySelector("#fahrenheit");
tempFahrenheitLink.addEventListener("click", showFahrenheit);

let tempCelsiusLink = document.querySelector("#celsius");
tempCelsiusLink.addEventListener("click", showCelsius);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);



function searchLocation(position) {
  let apiKey = '7d51494004d10e147e185b78d055e0e0'; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  apiUrl =  `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation)

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast")
  forecastElement.innerHTML = null;
  let forecast =null;

for (let index = 0; index < 6; index++) {
forecast = response.data.list[index];
forecastElement.innerHTML += `
<div class="col-2">
                <h3 >
                    ${formatHours(forecast.dt * 1000)}
                </h3>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
                 <div class="weather-forecast-temperature">
                    <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
               </div>
                </div>
                `;
}

  
}

function search(city) {
  let apiKey = "7d51494004d10e147e185b78d055e0e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

search("New York");

