var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var query;
// Trending hashtags in the United States
client.get('https://api.twitter.com/1.1/trends/place.json?id=23424977', function(error, trends) {
    if(error) throw error;
    query = trends[0].trends[0].query;
    //console.log(query);
    //console.log(trends[0].trends[0].name);
    //console.log(trends[0].trends[0].url);
});
var embedLink;
var oembedFormat;
client.get('search/tweets', {q: '%22Jacob+Wohl%22'}, function(error, tweets, response) {
    //console.log(tweets);
    var user = tweets.statuses[0].user.screen_name;
    user.replace(/\s+/g, '');
    var id = tweets.statuses[0].id_str;
    var link = 'https://twitter.com/' + user + '/status/' + id;
    embedLink = 'https://publish.twitter.com/oembed?url=' + link;

    client.get(embedLink, function(error, embed) {
        oembedFormat = embed.html;
    });
});

var http = require('http');
var fs = require('fs');

const PORT=8080;

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;

    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end(oembedFormat);
    }).listen(PORT);
});