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

// Trending hashtags in the United States
    client.get('https://api.twitter.com/1.1/trends/place.json?id=23424977', function(error, trends) {
        if(error) throw error;
        // Get top three trending topics
        for(i = 0; i < 3; i++){
            topicArray.push(trends[0].trends[i].name);
            queryArray.push(trends[0].trends[i].query);
        }
        //console.log(query);
        //console.log(trends[0].trends[0].name);
        //console.log(trends[0].trends[0].url);
        queryArray.forEach(function(query)
        {
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
        });
    });
    return topicsTweets;
}

exports.getTweets = getTweets;