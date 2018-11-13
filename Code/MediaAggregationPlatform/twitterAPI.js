const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var getTweets = function getTweets() {
    var queryArray = new Array();
    var oembedFormatArray = new Array();
    var topicArray = new Array();
    var topicsTweets = [topicArray, oembedFormatArray];

    // Trending topics in the United States
    client.get('https://api.twitter.com/1.1/trends/place.json?id=23424977', function(error, trends) {
        if(error) throw error;
        // Get top three trending topics
        for(i = 0; i < 3; i++){
            topicArray.push(trends[0].trends[i].name);
            var query = trends[0].trends[i].query;
            queryArray.push(query);

            client.get('search/tweets', {q: query}, function (error, tweets, response) {
                // Get three tweets from each topic
                for (i = 0; i < 3; i++) {
                    var user = tweets.statuses[i].user.screen_name;
                    user.replace(/\s+/g, '');
                    var id = tweets.statuses[i].id_str;
                    var link = 'https://twitter.com/' + user + '/status/' + id;
                    var embedLink = 'https://publish.twitter.com/oembed?url=' + link;

                    client.get(embedLink, function (error, embed) {
                        oembedFormatArray.push(embed.html);
                    });
                }
            });
        }
        queryArray.forEach(function(query)
        {

        });
    });
    return topicsTweets;
}

exports.getTweets = getTweets;