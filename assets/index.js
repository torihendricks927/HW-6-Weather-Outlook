var searchButton = document.getElementById('#submit');
var weatherResult = document.getElementById('#results');
var cityInput = document.getElementById('#city-input');

var FormSubmitHandler = function(event) {
    event.preventDefault();
    var weatherKey = '876f6264d3b8b4298eef0f75784efd16';
    var city = cityInput.value.trim();
    if (!city) {
        window.alert("Please place a city to search.")
    }
    else {
        getWeatherApi();
    }
}

function getWeatherApi() {
    var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={876f6264d3b8b4298eef0f75784efd16}';
        console.log(requestURL)

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)


        // for (var i = 0; i < data.length; i++) {
        //     var createTableRow = document.createElement('tr');
        //     var tableData = document.createElement('td');
        //     var link = document.createElement('a');

        //     link.textContent = data[i].html_url;
        //     link.href = data[i].html_url;

        //     tableData.appendChild(link);
        //     createTableRow.appendChild(tableData);
        //     weatherResult.appendChild(createTableRow);

        // }
    });
}

cityInput.addEventListener('submit', FormSubmitHandler);