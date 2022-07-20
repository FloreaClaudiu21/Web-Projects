//declare variables
const input = document.getElementById('input');
const showWeatherBtn = document.getElementById('show-weather');
const showForecastBtn = document.getElementById('show-forecast');
const weatherIcon = document.getElementById('weather-icon');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('presure');
const temp = document.getElementById('temp');
const minTemp = document.getElementById('min-temp');
const maxTemp = document.getElementById('max-temp');
const mapEl = document.getElementById('map');
const forecast = document.getElementById('forecast');

//APIs
const URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
const URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
const URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/";

showWeatherBtn.addEventListener('click', showWeather);
showForecastBtn.addEventListener('click', showForecastWeather);

function showWeather() {
    //verificam daca exista input
    if (input.value !== '') {
        fetch(URL_CURRENT_WEATHER + input.value)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                // console.log(data);
                description.innerHTML = `
                ${data.weather[0].description}
            `;
                humidity.innerHTML = `
                ${data.main.humidity}%
            `;
                pressure.innerHTML = `
                ${data.main.pressure}mb
            `;
                temp.innerHTML = `
                ${Math.floor(data.main.temp)}°C
            `;
                minTemp.innerHTML = `
                ${Math.floor(data.main.temp_min)}°C
            `;
                maxTemp.innerHTML = `
                ${Math.floor(data.main.temp_max)}°C
            `;
                weatherIcon.src = URL_WEATHER_ICON_PREFIX + data.weather[0].icon + '.png';

                //afisare harta locatie
                let mapOptions = {
                    center: new google.maps.LatLng(data.coord.lat, data.coord.lon), zoom: 10
                };
                let map = new google.maps.Map(mapEl, mapOptions);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

function showForecastWeather() {
    //verificam daca exista input
    if (input.value !== '') {
        fetch(URL_FORECAST_WEATHER + input.value)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                // console.log(data);
                for (let i = 0; i < 40; i++) {
                    forecast.innerHTML += `
                <div id="day">
                    <p id="day-title">Ziua: ${data.list[i].dt_txt}</p>
                    <img
                        src="${URL_WEATHER_ICON_PREFIX + data.list[i].weather[0].icon + '.png'}"
                    />
                    <p>Temperatura: ${Math.floor(data.list[i].main.temp)}°C</p>
                    <p>Descriere: ${data.list[i].weather[0].description}</p>
                </div>
            `;
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
