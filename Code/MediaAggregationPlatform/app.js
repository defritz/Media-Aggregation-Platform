var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var twitter = require('./twitterAPI');
var nytimes = require('./nytimesAPI');
//var youtube = require('./YTAPI');
var spotify = require('./spotifyapi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Arrays for storing latest news and media
var tweetArray;
var newsArray;
var videosArray;
var songsArray;

app.get('/', function(req, res) {
    res.render('login.ejs', {page: 'Login', menuId: 'login'});
});

app.get('/indexHome', function(req, res) {
	res.render('indexHome', {page:'Home', menuId:'home'});
    tweetArray = twitter.getTweets();
    newsArray = nytimes.getNews();
    //videosArray = youtube.getVideos();
    songsArray = spotify.getTracks();
});

app.get('/profile', function(req, res) {
	res.render('profile', {page:'Profile', menuId:'profile'});
});

app.post('/', function(req, res) {
    var selectVal = req.body.list;
    switch(selectVal) {
        case 'twitter':
            res.render('indexTwitter.ejs', {page: 'Home', menuId: 'home',
                //topic1: tweetArray[0][0], topic2: tweetArray[0][1], topic3: tweetArray[0][2],
                tweet1: tweetArray[1][0], tweet2: tweetArray[1][1], tweet3: tweetArray[1][2],
                tweet4: tweetArray[1][3], tweet5: tweetArray[1][4], tweet6: tweetArray[1][5],
                tweet7: tweetArray[1][6], tweet8: tweetArray[1][7], tweet9: tweetArray[1][8]
            });
            // Update latest tweets
            tweetArray = twitter.getTweets();
            break;
        case 'nytimes':
            res.render('indexNYTimes.ejs', {page: 'Home', menuId: 'home',
                title1: newsArray[0][0], title2: newsArray[0][1], title3: newsArray[0][2],
                title4: newsArray[0][3], title5: newsArray[0][4], title6: newsArray[0][5],
                title7: newsArray[0][6], title8: newsArray[0][7], title9: newsArray[0][8],
                abstract1: newsArray[1][0], abstract2: newsArray[1][1], abstract3: newsArray[1][2],
                abstract4: newsArray[1][3], abstract5: newsArray[1][4], abstract6: newsArray[1][5],
                abstract7: newsArray[1][6], abstract8: newsArray[1][7], abstract9: newsArray[1][8],
                url1: newsArray[2][0], url2: newsArray[2][1], url3: newsArray[2][2],
                url4: newsArray[2][3], url5: newsArray[2][4], url6: newsArray[2][5],
                url7: newsArray[2][6], url8: newsArray[2][7], url9: newsArray[2][8]
            });
            // Update latest news
            newsArray = nytimes.getNews();
            break;
        case 'youtube':
            res.render('indexYT.ejs', {page: 'Home', menuId: 'home',
                video1: videosArray[0], video2: videosArray[1], video3: videosArray[2],
                video4: videosArray[3], video5: videosArray[4], video6: videosArray[5],
                video7: videosArray[6], video8: videosArray[7], video9: videosArray[8]
            });
            // Update latest videos
            videosArray = youtube.getVideos();
            break;
        case 'spotify':
            res.render('indexSpotify.ejs', {
                page: 'Home', menuId: 'home',
                playlist1: songsArray[0], playlist2: songsArray[1]
            });
            songsArray = spotify.getTracks();
            break;
    }
});
app.listen(5000, function(){
    console.log("Listening on http://localhost:5000");
})

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
