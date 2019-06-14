'use strict';



function getWeather(latLng) {
    const WEATHER_API_KEY = 'da646b3b15fe6ea6c3affc9ca5999256';
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lng}&APPID=${WEATHER_API_KEY}`;
    return fetch(weatherURL)
            .then(res => res.json())
}





export default {
    getWeather
}