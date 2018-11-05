var express = require('express');
var router = express.Router();

var twitter = require('../twitterAPI');
statusArray = twitter.getTweets();

setTimeout(function() {
  getHomePage();
}, 700);

function getHomePage() {
  router.get('/', function(req, res, next) {
      res.render('index', { title: 'Twitter Display Demo', tweets: statusArray });
  });
}

module.exports = router;
