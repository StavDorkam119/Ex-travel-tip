


export default {
    initMap,
    addMarker,
    panTo,
}


var map;
var gMarker = null;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
    .then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
    })
}

function addMarker(loc, title) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: title,
        icon: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng( lat,  lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBAJi5G0cfHsEFpwHw2XeNr3Kc3_n-wMCo';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}







