console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'
// import { Swal } from '../lib/sweetalert2@8.js';

// const Swal = require('sweetalert2');

document.body.onload = () => {

    mapService.initMap()
        .then(() => locService.panToUserPosition()
            .then(res => {
                document.querySelector('.selected-location').innerText = res.results[0].formatted_address;
                console.log('res', res);
                
                weatherService.getWeather(res.results[0].geometry.location)
                    .then(handleWeather)
            })
        ).catch(console.warn)
    document.querySelector('.my-location-btn').onclick = locService.panToUserPosition
    document.querySelector('.search-location-btn').onclick = () => {
        let prmData = locService.onGetLocation()
        prmData.then(res => {
            mapService.panTo(res.latLng.lat, res.latLng.lng);
            mapService.addMarker(res.latLng, res.address);
            document.querySelector('.selected-location').innerText = res.address;
            weatherService.getWeather(res.latLng)
                .then(handleWeather)
        })
    }
    document.querySelector('.copy-location-btn').onclick = locService.copyLocation;

}



function handleWeather(res) {
    const {
        name,
        wind,
        main,
        weather
    } = res;
    console.log('weatherModel', name, wind, main, weather);
    console.log(res);
    document.querySelector('.weather-location').innerText = name;
    document.querySelector('.weather-description').innerText = ', ' + weather[0].description;
    document.querySelector('.weather-tempurature').innerText = parseInt(main.temp - 273.15) + '­°C';
    document.querySelector('.weather-temp-range span:first-child').innerText = parseInt(main.temp_min - 273.15) + '­°C';
    document.querySelector('.weather-temp-range span:nth-child(2)').innerText = parseInt(main.temp_max - 273.15) + '­°C';
    document.querySelector('.weather-wind-speed').innerText = 'wind ' + wind.speed + 'm/s';
}