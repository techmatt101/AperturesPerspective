class PhotoTipCardMapper {
    static map (rssResponse : any) : ICard[] {
        var cards : ICard[] = [];
        rssResponse = rssResponse.responseData.feed;

        var imgPaths : string[], imgPath : string;
        for (var i = 0; i < rssResponse.entries.length; i++) {
            var post = rssResponse.entries[i];

            imgPaths = <string[]> /<img src="([^]+?)"/g.exec(post.content);
            imgPath = undefined;
            if (imgPaths.length > 0 && !imgPaths[0].match(/feeds/g)) {
                imgPath = imgPaths[0].replace('<img src="', '');
                imgPath = imgPath.substring(0, imgPath.length - 1);
            }

            cards.push({
                title: post.title,
                text: post.contentSnippet,
                image: imgPath,
                info: rssResponse.title + ' by ' + post.author
                //tag: post.categories[0]
            });
        }

        return cards;
    }
}