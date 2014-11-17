/// <reference path='../lib/JSONP.d.ts'/>

class RSSFeedRequester implements IRequester {
    constructor(public feedUrl : string, public numberOfResults : number) {
    }

    request () {
        var options = {
            v: '1.0',
            num: this.numberOfResults,
            q: this.feedUrl
        };

        JSONP.get('http://ajax.googleapis.com/ajax/services/feed/load', options, (response) => {
            console.log(response);
        });
    }
}