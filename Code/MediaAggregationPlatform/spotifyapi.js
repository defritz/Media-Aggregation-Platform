var SpotifyWebApi = require('./spotify-web-api');
//var grantCredentials = require('get-spotify-client-credentials');

//var SpotifyWebApi = require('../');

//SpotifyWebAPI.SpotifyWebApi;
/**
 * This example retrieves the top tracks for an artist.
 * https://developer.spotify.com/spotify-web-api/get-artists-top-tracks/
 */

/**
 * This endpoint doesn't require an access token, but it's beneficial to use one as it
 * gives the application a higher rate limit.
 *
 * Since it's not necessary to get an access token connected to a specific user, this example
 * uses the Client Credentials flow. This flow uses only the client ID and the client secret.
 * https://developer.spotify.com/spotify-web-api/authorization-guide/#client_credentials_flow
 */
var spotifyApi = new SpotifyWebApi({
  clientId: '3d66ac1c2793421484d1bd58e68c5ab4',
  clientSecret: '55ef9bdab2f948a98c25304532655a5f'
});


// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(function(data) {
    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);

    // Get the most popular tracks from the Popular Playlist
    return spotifyApi.getPlaylistTracks('31ymdYCITDnZRtkKzP3Itp');
  })
  .then(function(data) {
    console.log('The most popular tracks are');
    console.log('Drum roll..');
    console.log('...');

    /*
     * 1. Space Oddity - 2009 Digital Remaster (popularity is 51)
     * 2. Heroes - 1999 Digital Remaster (popularity is 33)
     * 3. Let's Dance - 1999 Digital Remaster (popularity is 20)
     * 4. ...
    */
    data.body.tracks.forEach(function(track, index) {
      console.log(
        index +
          1 +
          '. ' +
          track.name +
          ' (popularity is ' +
          track.popularity +
          ')'
      );
    });
  })
  .catch(function(err) {
    console.log('Unfortunately, something has gone wrong.', err.message);
  });