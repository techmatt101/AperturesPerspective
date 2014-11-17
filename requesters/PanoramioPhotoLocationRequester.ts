/// <reference path='../lib/JSONP.d.ts'/>

enum PanoramioPhotoLocationImageSize {
    ORIGINAL, MEDIUM, SMALL, THUMBNAIL, SQUARE, MINI_SQUARE
}

class PanoramioPhotoLocationRequester implements IRequester {

    constructor (public latitude : number,
                 public longitude : number,
                 public startFrom = 0,
                 public numberOf = 5,
                 public imageSize : PanoramioPhotoLocationImageSize = PanoramioPhotoLocationImageSize.MEDIUM,
                 public radius = 0.01) {
        if (startFrom > 100) {
            console.error('API does not support from greater than 100');
        }
    }

    request () {
        var options = {
            set: 'public', // public (popular photos), full (all photos), user ID number
            size: PanoramioPhotoLocationImageSize[this.imageSize],
            from: this.startFrom, // max of 100
            to: this.startFrom + this.numberOf,
            minx: this.longitude - this.radius,
            miny: this.latitude - this.radius,
            maxx: this.longitude + this.radius,
            maxy: this.latitude + this.radius,
            mapfilter: true // filter out photos of the same location
        };

        JSONP.get('http://www.panoramio.com/map/get_panoramas.php', options, (response) => {
            console.log(response);
        });
    }
}