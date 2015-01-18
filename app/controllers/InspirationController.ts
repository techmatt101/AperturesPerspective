/// <reference path="../components/Activity"/>

class InspirationController extends Activity {

    private _inspirationFeed = new InspirationFeed();


    constructor () {
        super();
        var self = this;

        new TaskCollection('Feed Loader', () => {
            var cards : ICard[] = this._inspirationFeed.tipsCards.concat(this._inspirationFeed.locationCards).concat(this._inspirationFeed.photoCards);
            this.setCards(this.getElement('#all'), cards.shuffle());
        })
            .addAsync(function PhotoTips (callback) {
                self._inspirationFeed.loadPhotoTips(() => {
                    self.setCards(self.getElement('#tips'), self._inspirationFeed.tipsCards);
                    callback();
                });
            })
            .addAsync(function PhotoLocations (callback) {
                getLocationCoordinates((latitude, longitude) => {
                    self._inspirationFeed.loadLocations(latitude, longitude, () => {
                        self.setCards(self.getElement('#places'), self._inspirationFeed.locationCards);
                        callback();
                    });
                });
            })
            .addAsync(function Photos (callback) {
                self._inspirationFeed.loadPhotos(() => {
                    self.setCards(self.getElement('#photos'), self._inspirationFeed.photoCards);
                    callback();
                });
            })
            .run();
    }

    create () {
        super.create();
        this.view.classList.add('tabs'); //TODO: best way to do it?
        this.setView(Views.inspiration({tabs: ['All', 'Tips', 'Photos', 'Places', 'Saved']}));

        new ActionBar(this);
        new Tabs(this);
    }

    load() {
        this._inspirationFeed.fetchSavedCards();
        this.setCards(this.getElement('#saved'), this._inspirationFeed.savedCards, 'No saved items');
    }

    private setCards (element, cards : ICard[], emptyMsg = 'No content found') {
        if(cards.length == 0) {
            element.innerHTML = '<p>' + emptyMsg + '</p>';
            return;
        }
        element.innerHTML = '';
        this.addCards(element, cards);
    }

    private addCards (element, cards : ICard[]) {
        var cardsMarkup = '';
        var group = document.createElement('div');
        for (var i = 0; i < cards.length; i++) {
            cardsMarkup += Templates.card(cards[i]);
        }
        group.innerHTML = cardsMarkup;
        var fragment = document.createDocumentFragment();
        var childLength = group.children.length;
        for (var i = 0; i < childLength; i++) {
            fragment.appendChild(group.children[0]); //TODO: hmmm...
        }
        element.appendChild(fragment);
    }
}