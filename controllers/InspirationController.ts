class InspirationController {

    static PINNED_CARDS_ID = 'pinnedCards';

    private _tipsCards : ICard[]= [];
    private _locationCards : ICard[] = [];
    private _photoCards : ICard[] = [];
    private _pinnedCards : ICard[] = [];

    private _photoLocationRequester = new PanoramioPhotoLocationRequester();
    private _photoRequester = new FlickrPhotoRequester();
    private _photoTipRequester = new RSSFeedRequester();


    constructor () {
        var self = this;

        document.body.innerHTML = Views.inspiration({title: "Matt's Web App"});

        this.fetchPinnedCards();

        var cardsMarkup = '';
        for (var i = 0; i < this._pinnedCards.length; i++) {
            cardsMarkup += Templates.card(this._pinnedCards[i]);
        }

        document.getElementById('pinned').innerHTML = cardsMarkup;

        getLocationCoordinates((latitude, longitude) => {
            new TaskCollection('Feed Loader', () => {
                var cardsMarkup = '',
                    cards : ICard[] = this._tipsCards.concat(this._locationCards).concat(this._photoCards);
                cards.shuffle();

                for (var i = 0; i < cards.length; i++) {
                    cardsMarkup += Templates.card(cards[i]);
                }

                document.getElementById('feed').innerHTML = cardsMarkup;
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

    fetchPinnedCards() {
        this._pinnedCards = JSON.parse(localStorage.getItem(InspirationController.PINNED_CARDS_ID)) || [];
    }

    pinCard(card : ICard) {
        this._pinnedCards.push(card);
        localStorage.setItem(InspirationController.PINNED_CARDS_ID, JSON.stringify(this._pinnedCards));
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