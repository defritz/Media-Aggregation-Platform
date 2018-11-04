const app = require('./app');
var pug = require('pug');

var Twitter = require('twitter');

var express = require('express');
var path = require('path');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var queryArray = new Array();
var embedLink;
var oembedFormat = new Array();

// Trending hashtags in the United States
client.get('https://api.twitter.com/1.1/trends/place.json?id=23424977', function(error, trends) {
    if(error) throw error;
    for(j = 0; j < 3; j++){
        queryArray.push(trends[0].trends[j].query);
    }
    //console.log(query);
    //console.log(trends[0].trends[0].name);
    //console.log(trends[0].trends[0].url);
    queryArray.forEach(function(query)
    {
        client.get('search/tweets', {q: query}, function (error, tweets, response) {
            //console.log(tweets);
            for (i = 0; i < 3; i++) {
                var user = tweets.statuses[i].user.screen_name;
                user.replace(/\s+/g, '');
                var id = tweets.statuses[i].id_str;
                var link = 'https://twitter.com/' + user + '/status/' + id;
                embedLink = 'https://publish.twitter.com/oembed?url=' + link;

                client.get(embedLink, function (error, embed) {
                    oembedFormat.push(embed.html);
                    //var html = pug.renderFile('./views/index.pug', {posts : './index.html' , pageTitle : 'Test'});
                    //console.log('html : ' , html);
                });
            }
        });
    });
});
/*
const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});
*/
var http = require('http');
var fs = require('fs');

const PORT=8080;

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;

    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);

        // Displays the oembed formatted Tweets
        oembedFormat.forEach(function(entry) {
            response.write('<html>');
            response.write('<body>');
            response.write('<h1>Tweet:</h1>');
            response.write(entry);
            response.write('</body>');
            response.write('</html>');
        });

        response.end();
    }).listen(PORT);
});

/*
app.get('/', function(req, resp) {
    resp.writeHeader(200, {"Content-Type": "text/html"});

    // Displays the oembed formatted Tweets
    oembedFormat.forEach(function(entry) {
        resp.write('<html>');
        resp.write('<body>');
        resp.write('<h1>Tweet:</h1>');
        resp.write(entry);
        resp.write('</body>');
        resp.write('</html>');
    });

    resp.end();
});
app.listen(3000);
*/