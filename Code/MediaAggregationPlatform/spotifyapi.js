var request = require('request'); // "Request" library

var client_id = process.env.SPOTIFY_API_KEY; // Your client id
var client_secret = process.env.SPOTIFY_SECRET_KEY; // Your secret

var oEmbedArray = new Array();

// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
            url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks?market=US&fields=items(track(popularity)%2C%20track(name))&limit=10',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            /*
            console.log(body);
            */
        });
    }
});

var getTracks = function getTracks(){
    oEmbedArray[0] = '<iframe src="https://open.spotify.com/embed/user/spotifycharts/playlist/37i9dQZEVXbLRQDuF5jeBp" ' +
        'width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
    oEmbedArray[1] = '<iframe src="https://open.spotify.com/embed/user/spotifycharts/playlist/37i9dQZEVXbLiRSasKsNU9" ' +
        'width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
    oEmbedArray[2] = '<iframe src="https://open.spotify.com/embed/user/selahrose726/playlist/3O9SfP3rrfbHFnMKEF0x3C" ' +
        'width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
    return oEmbedArray;
}

exports.getTracks = getTracks;