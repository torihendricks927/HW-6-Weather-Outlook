var searchButton = document.querySelector('#submit');
var weatherResult = document.querySelector('#results');
var cityInput = document.querySelector('#city');
var APIKey = '876f6264d3b8b4298eef0f75784efd16';
var city;

var FormSubmitHandler = function(event) {
    event.preventDefault();
    var weatherKey = '876f6264d3b8b4298eef0f75784efd16';
    var cityInsert = cityInput.value.trim();
    if (!cityInsert) {
        window.alert("Please place a city to search.")
    }
    else {
        getWeatherApi();
    }
}


function getWeatherApi(cityInput) {
    var city = [];
    var APIKey = '876f6264d3b8b4298eef0f75784efd16';
    var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
         console.log(requestURL)
        //  document.write(requestURL)

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        // document.write(data)

       

        for (var i = 0; i < data.length; i++) {
            var createTableRow = document.createElement('tr');
            var tableData = document.createElement('td');
            var link = document.createElement('a');

            link.textContent = data[i].html_url;
            link.href = data[i].html_url;

            tableData.appendChild(link);
            createTableRow.appendChild(tableData);
            weatherResult.appendChild(createTableRow);

        }
    });
}

var saveCitySearch = function() {
    localStorage.setItem("city", JSON.stringify(city));
}

var returnPastSearch = function() {
    localStorage.getItem("city", JSON.stringify(city));
}

searchButton.addEventListener('click', FormSubmitHandler);