class InspirationFeed {

    tipsCards : ICard[] = [];
    locationCards : ICard[] = [];
    photoCards : ICard[] = [];
    savedCards : ICard[] = [];

    private static PINNED_CARDS_ID = 'savedCards';

    private _photoLocationRequester = new PanoramioPhotoLocationRequester();
    private _photoRequester = new FlickrPhotoRequester();
    private _photoTipRequester = new RSSFeedRequester();


    loadLocations (latitude, longitude, callback) {
        this._photoLocationRequester.latitude = latitude;
        this._photoLocationRequester.longitude = longitude;
        this._photoLocationRequester.request((response) => {
            this.locationCards = PhotoLocationCardMapper.map(response);
            callback();
        });
    }

    loadPhotos (callback) {
        this._photoRequester.request((response) => {
            this.photoCards = PhotoInspirationCardMapper.map(response);
            callback();
        });
    }

    loadPhotoTips (callback) {
        this._photoTipRequester.feedUrl = 'http://feedproxy.google.com/DigitalPhotographySchool';
        this._photoTipRequester.request((response) => {
            this.tipsCards = PhotoTipCardMapper.map(response);
            callback();
        });
    }

    fetchSavedCards () {
        this.savedCards = JSON.parse(localStorage.getItem(InspirationFeed.PINNED_CARDS_ID)) || [];
    }

    saveCard (card : ICard) {
        this.savedCards.push(card);
        localStorage.setItem(InspirationFeed.PINNED_CARDS_ID, JSON.stringify(this.savedCards));
    }
}