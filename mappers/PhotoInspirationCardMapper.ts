class PhotoInspirationCardMapper {
    static map (flickrPhotoResponse : any) : ICard[] {
        var cards : ICard[] = [];
        flickrPhotoResponse = flickrPhotoResponse.photos;

        for (var i = 0; i < flickrPhotoResponse.photo.length; i++) {
            var photo = flickrPhotoResponse.photo[i];
            cards.push({
                title: photo.title,
                image: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg',
                imageAlt: photo.title
            });
        }

        return cards;
    }
}