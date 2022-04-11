var searchFormEl = document.querySelector("#search-form");
var weatherDayCityEl = document.querySelector("#weather-day-city");
var weatherDayTempEl = document.querySelector("weather-day-temp");
var weatherDayWindEl = document.querySelector("#weather-day-wind");
var weatherDayUvIndexEl = document.querySelector("#weather-day-uv-index");
var weatherDayHumidityEl = document.querySelector("#weather-day-humidity");
// var searchButton = document.querySelector('#submit');
var searchFormCityInputEl = document.querySelector("#search-form-city-input");
// var weatherResult = document.querySelector('#results');
// var cityInput = document.querySelector('#city');
// var city;
var baseUrl = "https://api.openweathermap.org/";
var apiKey = "876f6264d3b8b4298eef0f75784efd16";



function getWeatherApi(city) {
    var requestUrl= `${baseUrl}geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
         console.log(requestUrl)

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        return;
        });
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




// var saveCitySearch = function() {
//     localStorage.setItem("city", JSON.stringify(city));
// }

// var returnPastSearch = function() {
//     localStorage.getItem("city", JSON.stringify(city));
// }

// searchButton.addEventListener('click', FormSubmitHandler);

init();