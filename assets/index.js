var searchFormEl = document.querySelector("#search-form");
var weatherDayCityEl = document.querySelector("#weather-day-city");
var weatherDayTempEl = document.querySelector("weather-day-temp");
var weatherDayWindEl = document.querySelector("#weather-day-wind");
var weatherDayUvIndexEl = document.querySelector("#weather-day-uv-index");
var weatherDayHumidityEl = document.querySelector("#weather-day-humidity");
var searchButton = document.querySelector('#submit');
var searchFormCityInputEl = document.querySelector("#search-form-city-input");
var weatherResult = document.querySelector('#results');
var cityInput = document.querySelector('#city');
var APIKey = '876f6264d3b8b4298eef0f75784efd16';
var city;


function addEventListeners() {
    searchFormEl.addEventListener("submit", FormSubmitHandler) {
    }
}

function init() {
    addEventListeners();
}





var FormSubmitHandler = function(event) {
    event.preventDefault();
    var weatherKey = '876f6264d3b8b4298eef0f75784efd16';
    var cityInsert = searchFormCityInputEl.value;
    if (!cityInsert) {
        window.alert("Please place a city to search.")
    }
    else {
        getWeatherApi();
    }
}


// function getWeatherApi(cityInput) {
//     var city = [];
//     var APIKey = '876f6264d3b8b4298eef0f75784efd16';
//     var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
//          console.log(requestURL)
//         //  document.write(requestURL)

//     fetch(requestURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//         // document.write(data)

       

//         for (var i = 0; i < data.length; i++) {
//             var createTableRow = document.createElement('tr');
//             var tableData = document.createElement('td');
//             var link = document.createElement('a');

//             link.textContent = data[i].html_url;
//             link.href = data[i].html_url;

//             tableData.appendChild(link);
//             createTableRow.appendChild(tableData);
//             weatherResult.appendChild(createTableRow);

//         }
//     });
// }

// var saveCitySearch = function() {
//     localStorage.setItem("city", JSON.stringify(city));
// }

// var returnPastSearch = function() {
//     localStorage.getItem("city", JSON.stringify(city));
// }

// searchButton.addEventListener('click', FormSubmitHandler);

init();