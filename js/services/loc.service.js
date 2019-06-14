import mapService from './map.service.js'
// import Swal from '../../lib/sweetalert2@8.js/index.js';

function copyLocation() {
    getUserPosition()
     .then(res => {
        `
        https://maps.googleapis.com/maps/api/geocode/json?address=${searchedLocationInput}&key=${API_KEY}`
     })

}



function onGetLocation() {
    const API_KEY = 'AIzaSyBAJi5G0cfHsEFpwHw2XeNr3Kc3_n-wMCo';
    const searchedLocationInput = document.querySelector('.search-input').value;
    const searchedLocationUrl = `
    https://maps.googleapis.com/maps/api/geocode/json?address=${searchedLocationInput}&key=${API_KEY}`;
    return _getLocation(searchedLocationUrl)
        .then(res => {
            const latLng = res.results[0].geometry.location;
            const address = res.results[0].formatted_address;
            return {
                latLng,
                address
            };
        })
        .catch(res => {
            console.log('failure', res)
        })

}

function _getLocation(searchedLocation) {
    return fetch(searchedLocation)
        .then((res) => {
            return res.json()
        })
        .catch(() => console.log('Could not find location'))
}

function getUserPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        // debugger;
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function panToUserPosition() {
    return getUserPosition()
        .then(pos => {
            const latLng = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            mapService.addMarker(latLng, 'My Location');
            return fetchLocationName(latLng);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function fetchLocationName(latLng) {
    const API_KEY = 'AIzaSyBAJi5G0cfHsEFpwHw2XeNr3Kc3_n-wMCo';
    const urlToFetch = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${API_KEY}`
    return fetch(urlToFetch)
        .then(res => res.json())
}



export default {
    getUserPosition,
    panToUserPosition,
    onGetLocation,
    fetchLocationName,
    copyLocation
}