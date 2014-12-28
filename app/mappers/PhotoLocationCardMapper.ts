class PhotoLocationCardMapper {
    static map (panoramioPhotoResponse : any) : ICard[] {
        var cards : ICard[] = [];

        for (var i = 0; i < panoramioPhotoResponse.photos.length; i++) {
            var photo = panoramioPhotoResponse.photos[i];
            cards.push({
                title: photo.photo_title,
                image: photo.photo_file_url,
                imageAlt: photo.photo_title,
                mapImage: getGoogleMapImage(photo.latitude, photo.longitude)
            });
        }

        return cards;
    }
}