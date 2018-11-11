var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var twitter = require('./twitterAPI');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Retrieve and display tweets
tweetArray = twitter.getTweets();

app.get('/', function(req, res) {
    res.render('index.ejs', {page: 'Home', menuId: 'home',
        topic1: tweetArray[0][0], topic2: tweetArray[0][1], topic3: tweetArray[0][2],
        tweets1: tweetArray[1].slice(0,3), tweets2: tweetArray[1].slice(3,6), tweets3: tweetArray[1].slice(6,9) });
});
app.listen(3000, function(){
    console.log("Listening on http://localhost:3000");
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
