class RSSFeedRequester implements IRequester {
    public feedUrl = '';
    public numberOfResults = 5;


    request(callback) {
        JSONP({
            url: 'http://ajax.googleapis.com/ajax/services/feed/load',
            data: {
                v: '1.0',
                num: this.numberOfResults,
                q: this.feedUrl
            },
            success: callback
        });
    }
}