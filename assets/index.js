var searchFormEl = document.querySelector("#search-form");
var weatherDayCityEl = document.querySelector("#weather-day-city");
var weatherDayTempEl = document.querySelector("#weather-day-temp");
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
var buttonContainerEl = document.querySelector("#button-container");

// creates the 5 day box forcast below top container
function populateFiveDay(data) {
    forecastContainerEl.innerHTML = "";
    data.forEach(function(day, index) {
        if (index === 0 || index > 5) {
            return;
        }
        var dt = day.dt;
        var temp = day.temp.day;
        var windSpeed = day.wind_speed;
        var humidity = day.humidity;
        var uviIndex = day.uvi;
        var date = moment(dt * 1000).format("L");
        var icon = day.weather[0].icon;
        var div = document.createElement("div");
        var offsetClass = "";
        if (index === 1) {
          offsetClass = "col-lg-offset-1";
        }
            div.classList = `card-weather-container col-sm-12 ${offsetClass} col-lg-2 text-light`;
            div.innerHTML = `
                        <div class="card-weather bg-dark p-3">
                            <h4>${date}</h4>
                            <img src="https://openweathermap.org/img/wn/${icon}.png" />
                            <dl>
                                <dt>Temp:</dt>
                                <dd>${temp}</dd>
                                <dt>Wind:</dt>
                                <dd>${windSpeed} MPH</dd>
                                <dt>Humidity</dt>
                                <dd>${humidity}%</dd>
                            </dl>
                        </div>
                        `;

                forecastContainerEl.appendChild(div);
    });
    outerForecastContainerEL.classList.remove("hide");
}

// creates process of fetching API to obtain information searched
function getWeatherApi(city) {
    var requestUrl= `${baseUrl}geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
         console.log(requestUrl)

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        
        saveCitySearch(city);
        populateButtons();


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
            if (uviIndex < 3) {
                weatherDayUvIndexEl.classList.add("favorable");
              } else if (uviIndex < 7) {
                weatherDayUvIndexEl.classList.add("moderate");
              } else {
                weatherDayUvIndexEl.classList.add("severe");
              }
    
            
            WeatherDayIconEl.src= `https://openweathermap.org/img/wn/${icon}.png`;
            weatherDayContainerEl.classList.remove("hide");
            populateFiveDay(data.daily);

        });
    });
}


// saves past search history to local storage
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

// creates buttons for pas searched cities below search bar
function populateButtons() {
    buttonContainerEl.innerHTML = "";
    var cities = window.localStorage.getItem("cities");
    if (cities) {
        cities = JSON.parse(cities);
    }
    else {
        cities = [];
    }

    cities.forEach(function (city) {
        var button = document.createElement("button");
        button.classList = "btn btn-secondary col-12";
        button.textContent = city;
        button.setAttribute("data-city", city);
        buttonContainerEl.appendChild(button);
    });
}

// takes click of button to fetch api function
function handleButtonClick(event) {
    var target = event.target;
    var city = target.getAttribute("data-city");
    getWeatherApi(city);
}


function FormSubmitHandler(event) {
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
    buttonContainerEl.addEventListener("click", handleButtonClick);
}

function init() {
    addEventListeners();
    populateButtons();
}


init();