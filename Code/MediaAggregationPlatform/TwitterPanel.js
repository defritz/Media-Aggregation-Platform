var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'EV48K9tLsn6g95CyHD2Wx9G60',
    consumer_secret: 'Tb7YxHB1HZRyNlXHhULpT1dZ0lcpVIslDOtmVCx1S1OWwiL7fz',
    access_token_key: '550620730-yTdnlcGNE6LsRiN4bddk1uxMEdMmWcZAU6c7wSgF',
    access_token_secret: 'RnFPVE9EGmKVRf7xB6IdHE6V1NtR9cPwn4yHvFVZZtRdb'
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