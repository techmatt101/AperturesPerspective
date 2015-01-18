/// <reference path="../components/Activity"/>

class InspirationController extends Activity {

    private _inspirationFeed = new InspirationFeed();


    constructor () {
        super();
        var self = this;

        getLocationCoordinates((latitude, longitude) => {
            new TaskCollection('Feed Loader', () => {
                var cardsMarkup = '',
                    cards : ICard[] = this._inspirationFeed.tipsCards.concat(this._inspirationFeed.locationCards).concat(this._inspirationFeed.photoCards);
                cards.shuffle();

                for (var i = 0; i < cards.length; i++) {
                    cardsMarkup += Templates.card(cards[i]);
                }

                document.getElementById('feed').innerHTML = cardsMarkup;
            })
                .addAsync(function PhotoTips(callback) {
                    self._inspirationFeed.loadPhotoTips(callback);
                })
                .addAsync(function PhotoLocations(callback) {
                    self._inspirationFeed.loadLocations(latitude, longitude, callback);
                })
                .addAsync(function Photos(callback) {
                    self._inspirationFeed.loadPhotos(callback);
                })
                .run();
        });
    }

    create () {
        super.create();
        new ActionBar('Inspiration');
        this.setView(Views.inspiration());
    }

    load() {
        this._inspirationFeed.fetchSavedCards();

        var cardsMarkup = '';
        for (var i = 0; i < this._inspirationFeed.savedCards.length; i++) {
            cardsMarkup += Templates.card(this._inspirationFeed.savedCards[i]);
        }

        document.getElementById('pinned').innerHTML = cardsMarkup;
    }
}