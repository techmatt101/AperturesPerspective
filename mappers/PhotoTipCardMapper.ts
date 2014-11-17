class PhotoTipCardMapper {
    static map (rssResponse : any) : ICard[] {
        var cards : ICard[] = [];

        for (var i = 0; i < rssResponse.responseData.feed.entries.length; i++) {
            var post = rssResponse.responseData.feed.entries[i];

            var imgPaths = /<img src="([^]+?)"/g.exec(post.content);
            var imgPath;
            if (imgPaths.length > 0) {
                imgPath = (<string>imgPaths[0]).replace('<img src="', '');
                imgPath = imgPath.substring(0, imgPath.length - 1);
            }

            cards.push({
                title: post.title,
                text: post.contentSnippet,
                info: 'by ' + post.author,
                image: imgPath
            });
        }

        return cards;
    }
}