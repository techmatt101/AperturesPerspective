/// <reference path='commonHelper'/>

function getLocationCoordinates(callback : (latitude : number, longitude : number) => void) { //TODO: handle no location
    navigator.geolocation.getCurrentPosition(function(position) {
        callback(position.coords.latitude, position.coords.longitude);
    });
}

function getGoogleMapImage(latitude : number, longitude : number, sizeX = 400, sizeY = 320, zoom = 14) {
    return 'https://maps.googleapis.com/maps/api/staticmap?' + objectToUrlParameters({
        center: latitude + ',' + longitude,
        zoom: zoom,
        size: sizeX + 'x' + sizeY,
        markers: latitude + ',' + longitude
    });
}