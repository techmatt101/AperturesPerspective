enum PanoramioPhotoLocationImageSize {
    ORIGINAL, LARGE, MEDIUM, SMALL, THUMBNAIL, SQUARE, MINI_SQUARE
}

class PanoramioPhotoLocationRequester implements IRequester {
    public latitude = 0;
    public longitude = 0;
    public startFrom = 0;
    public numberOf = 5;
    public imageSize : PanoramioPhotoLocationImageSize = PanoramioPhotoLocationImageSize.MEDIUM;
    public radius = 0.01;


    request (callback) {
        var options = {
            set: 'public', // public (popular photos), full (all photos), user ID number
            size: PanoramioPhotoLocationImageSize[this.imageSize].toLowerCase(),
            from: this.startFrom, // max of 100
            to: this.startFrom + this.numberOf,
            minx: this.longitude - this.radius,
            miny: this.latitude - this.radius,
            maxx: this.longitude + this.radius,
            maxy: this.latitude + this.radius,
            mapfilter: true // filter out photos of the same location
        };

        JSONP.get('http://www.panoramio.com/map/get_panoramas.php', options, callback);
    }
}