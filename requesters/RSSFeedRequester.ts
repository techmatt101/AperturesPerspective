class RSSFeedRequester implements IRequester {
    public feedUrl = '';
    public numberOfResults = 10;


    request (callback) {
        var options = {
            v: '1.0',
            num: this.numberOfResults,
            q: this.feedUrl
        };

        JSONP.get('http://ajax.googleapis.com/ajax/services/feed/load', options, callback);
    }
}