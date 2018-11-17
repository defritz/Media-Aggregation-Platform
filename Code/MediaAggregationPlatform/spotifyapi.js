var request = require('request'); // "Request" library

var client_id = '3d66ac1c2793421484d1bd58e68c5ab4'; // Your client id
var client_secret = '55ef9bdab2f948a98c25304532655a5f'; // Your secret

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
    oEmbedArray[0] = '<iframe src="https://open.spotify.com/embed/user/spotifycharts/playlist/37i9dQZEVXbLRQDuF5jeBp" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
    oEmbedArray[1] = '<iframe src="https://open.spotify.com/embed/user/selahrose726/playlist/3O9SfP3rrfbHFnMKEF0x3C" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
    for (i = 0; i < 2; i++){
        console.log(oEmbedArray[i]);
    }
    return oEmbedArray;
}

exports.getTracks = getTracks;