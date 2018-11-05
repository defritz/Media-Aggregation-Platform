const app = require('./app');
var pug = require('pug');

var express = require('express');
var path = require('path');

var twitter = require('./twitterAPI');

statusArray = twitter.getTweets();

setTimeout(function() {
    startServer();
}, 700);

function startServer() {
    //console.log(statusArray);
    app.get('/', function(req, res) {
        res.setHeader("Content-Type", 'text/html');
        //res.render('index', { tweets: statusArray[0] });
        //res.render('index', { tweets: 'Hello World' });
    });
    app.listen(3000, function(){
        console.log("Listening on http://localhost:3000");
    })
}

// Server method #2
/*
var http = require('http');
var fs = require('fs');
const PORT=3000;

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
*/
// Server method #3
/*
app.get('/', function(req, res) {

    // Displays the oembed formatted Tweets
    oembedFormat.forEach(function(entry) {
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>Tweet:</h1>');
        res.write(entry);
        res.write('</body>');
        res.write('</html>');
    });

    res.end();
});
app.listen(3000);
*/