class InspirationController {

    private _inspirationFeed = new InspirationFeed();


    constructor () {
        var self = this;
        loadView('Inspiration', Views.inspiration());

        this._inspirationFeed.fetchSavedCards();

        var cardsMarkup = '';
        for (var i = 0; i < this._inspirationFeed.savedCards.length; i++) {
            cardsMarkup += Templates.card(this._inspirationFeed.savedCards[i]);
        }

        document.getElementById('pinned').innerHTML = cardsMarkup;

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
}