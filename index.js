let apiKey = "417ebtb8abef04ca4c5fo2cbf8b13fe6";
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getCurrentTime() {
    let now = new Date();
    let hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
    let minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
    return days[now.getDay()] + " " + hours + ":" + minutes;
}

function setLocation(event) {
    event.preventDefault();
    let searchLocation = document.querySelector("#search-input");
    document.querySelector("#loading-thingy").classList.remove("hide");

    fetchForecast(searchLocation.value);
}

function fetchForecast(city) {
    axios
        .get(`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`)
        .then(parseResponse, city);
}

function parseResponse(response, city) {
    document.querySelector("#temperature").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#city").innerHTML = response.data.city;
    document.querySelector("#current-country").innerHTML = response.data.country;
    document.querySelector("#condition").innerHTML = response.data.condition.description;
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
    document.querySelector("#weather-icon").src = response.data.condition.icon_url;
    document.querySelector("#weather-icon").alt = response.data.condition.description;
    document.querySelector("#welcome-message").classList.add("hide");
    document.querySelector("#weather-forecast").classList.remove("hide");
    document.querySelector("#loading-thingy").classList.add("hide");

    getForecast(response.data.city);

}

function friendlyDay (timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days [date.getDay()];
}

function getForecast (city) {
    let apiKey = "417ebtb8abef04ca4c5fo2cbf8b13fe6";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml =
            forecastHtml +
            `<div class="forecast-day">
                    <div class="forecast-date">${friendlyDay(day.time)}</div>
             
                    <img src="${day.condition.icon_url}" class="forecast-icon">
                   
                    <div class="forecast-temperatures">
                        <span class="high-temperature">
                            <strong>${Math.round(day.temperature.maximum)}º</strong>
                        </span>
                        <span class="low-temperature">${Math.round(day.temperature.minimum)}º</span>
                    </div>
            </div>
`;}
    });
    let forecast = document.querySelector("#forecast");
    forecast.innerHTML = forecastHtml;
}


    document.querySelector("#time").innerHTML = getCurrentTime();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", setLocation);


