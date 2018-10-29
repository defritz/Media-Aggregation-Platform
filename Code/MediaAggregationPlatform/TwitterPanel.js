var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Trending hashtags in the United States
client.get('https://api.twitter.com/1.1/trends/place.json?id=23424977', function(error, trends) {
    if(error) throw error;
    console.log(trends[0]);
});
// Trending hashtags in Texas
/*
client.get('https://api.twitter.com/1.1/trends/place.json?id=2347602', function(error, trends) {
    if(error) throw error;
    console.log(trends[0]);
});*/