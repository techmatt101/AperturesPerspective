class FlickrPhotoRequester implements IRequester {

    request (callback) {
        var options = {
            api_key: '8caacff452ab56279e9c871c36ceb4f9',
            format: 'json',
            method: 'flickr.photos.search',
            per_page: 5,
            tags: 'red'
        };

        JSONP.get('https://api.flickr.com/services/rest/', options, callback, 'jsoncallback');
    }
}