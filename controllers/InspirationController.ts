/// <reference path='../helpers/commonHelper'/>
/// <reference path='../helpers/locationHelper'/>

class InspirationController {

    private _tipsCards : ICard[]= [];
    private _locationCards : ICard[] = [];
    private _photoCards : ICard[] = [];

    private _photoLocationRequester = new PanoramioPhotoLocationRequester();
    private _photoRequester = new FlickrPhotoRequester();
    private _photoTipRequester = new RSSFeedRequester();


    constructor () {
        var self = this;

        getLocationCoordinates((latitude, longitude) => {
            new TaskCollection('Feed Loader', () => {
                var cardsMarkup = '',
                    cards : ICard[] = this._tipsCards.concat(this._locationCards).concat(this._photoCards);
                cards.shuffle();

                for (var i = 0; i < cards.length; i++) {
                    cardsMarkup += Templates.card(cards[i]);
                }

                document.body.innerHTML = cardsMarkup;
            })
                .addAsync(function PhotoTips(callback) {
                    self.loadPhotoTips(callback);
                })
                .addAsync(function PhotoLocations(callback) {
                    self.loadLocations(latitude, longitude, callback);
                })
                //.addAsync(function Photos(callback) {
                //    self.loadPhotos(latitude, longitude, callback);
                //})
                .run();
        });
    }

    loadLocations (latitude, longitude, callback) {
        this._photoLocationRequester.latitude = latitude;
        this._photoLocationRequester.longitude = longitude;
        this._photoLocationRequester.request((response) => {
            console.log(response);
            this._locationCards = PhotoLocationCardMapper.map(response);
            callback();
        });
    }

    loadPhotos (latitude, longitude, callback) {
        this._photoRequester.latitude = latitude;
        this._photoRequester.longitude = longitude;
        this._photoRequester.request((response) => {
            console.log(response);
            this._photoCards = PhotoInspirationCardMapper.map(response);
            callback();
        });
    }

    loadPhotoTips (callback) {
        this._photoTipRequester.feedUrl = 'http://feedproxy.google.com/DigitalPhotographySchool';
        this._photoTipRequester.request((response) => {
            console.log(response);
            this._tipsCards = PhotoTipCardMapper.map(response);
            callback();
        });
    }
}