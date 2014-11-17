/// <reference path='../lib/JSONP.d.ts'/>

class MapRequester implements IRequester {

    constructor (public latitude : number,
                 public longitude : number,
                 public sizeX : number,
                 public sizeY : number,
                 public zoom = 14) {
    }

    request () {
        var options = {
            center: this.latitude + ',' + this.longitude,
            zoom: this.zoom,
            size: this.sizeX + 'x' + this.sizeY,
            markers: this.latitude + ',' + this.longitude
        };

        JSONP.get('https://maps.googleapis.com/maps/api/staticmap', options, (response) => {
            console.log(response);
        });
    }
}