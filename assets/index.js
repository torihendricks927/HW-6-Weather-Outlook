var searchFormEl = document.querySelector("#search-form");
var weatherDayCityEl = document.querySelector("#weather-day-city");
var weatherDayTempEl = document.querySelector("weather-day-temp");
var weatherDayWindEl = document.querySelector("#weather-day-wind");
var weatherDayUvIndexEl = document.querySelector("#weather-day-uv-index");
var weatherDayHumidityEl = document.querySelector("#weather-day-humidity");
var searchFormCityInputEl = document.querySelector("#search-form-city-input");
var baseUrl = "https://api.openweathermap.org/";
var apiKey = "876f6264d3b8b4298eef0f75784efd16";
var weatherDayDateEl = document.querySelector("#weather-day-date");
var forecastContainerEl = document.querySelector("#forecast-container");
var WeatherDayIconEl = document.querySelector("#weather-day-icon");
var weatherDayContainerEl = document.querySelector("#weather-day-container");
var outerForecastContainerEL = document.querySelector("#outer-forecast-container");

function populateFiveDay(data) {
    data.forEach(function(day) {
        var current = data.current;
        var temp = current.temp;
        var windSpeed = current.wind_speed;
        var humidity = current.humidity;
        var uviIndex = current.uvi;
    })
}

function getWeatherApi(city) {
    var requestUrl= `${baseUrl}geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
         console.log(requestUrl)

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        
        var cityObject = data[0];
        var lat = cityObject.lat;
        var lon = cityObject.lon;
        var currentWeatherUrl = `${baseUrl}data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        fetch(currentWeatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            
            var current = data.current;
            var temp = current.temp;
            var windSpeed = current.wind_speed;
            var humidity = current.humidity;
            var uviIndex = current.uvi;
            var date = moment(Date.now()).format("L");
            var icon = current.weather[0].icon;

            weatherDayCityEl.textContent = city;
            weatherDayDateEl.textContent = date;
            weatherDayTempEl.textContent = temp;
            weatherDayWindEl.textContent = windSpeed;
            weatherDayHumidityEl.textContent = humidity;
            weatherDayUvIndexEl.textContent = uviIndex;
            
            WeatherDayIconEl.src= `https://openweathermap.org/img/wn/${icon}.png`;
            weatherDayContainerEl.classList.remove("hide");
            populateFiveDay(data.daily);

        });
    });
}

function saveCitySearch(city) {
    city = city.toLowerCase();
    var cities = window.localStorage.getItem("cities");
    if (cities) {
        cities = JSON.parse(cities);
    }
    else {
        cities = [];
    }
    if (cities.includes(city)) {
        return;
    }
    else {
        cities.push(city);
    }

    window.localStorage.setItem("cities", JSON.stringify(cities));
}


var FormSubmitHandler = function(event) {
    event.preventDefault();
    var city = searchFormCityInputEl.value;
    if (!city) {
        window.alert("Please place a city to search.")
    }
    else {
        getWeatherApi(city);
    }
}


function addEventListeners() {
    searchFormEl.addEventListener("submit", FormSubmitHandler);
}

function init() {
    addEventListeners();
}


init();