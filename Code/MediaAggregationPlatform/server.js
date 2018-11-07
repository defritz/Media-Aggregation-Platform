const app = require('./app');
var twitter = require('./twitterAPI');

tweetArray = twitter.getTweets();

// Give the API time to retrieve Tweets
setTimeout(function() {
    startServer();
}, 700);

function startServer() {
    app.get('/', function(req, res) {
        res.render('index', {page: 'Home', menuId: 'home',
            topic1: tweetArray[0][0], topic2: tweetArray[0][1], topic3: tweetArray[0][2],
            tweets1: tweetArray[1].slice(0,3), tweets2: tweetArray[1].slice(3,6), tweets3: tweetArray[1].slice(6,9) });
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