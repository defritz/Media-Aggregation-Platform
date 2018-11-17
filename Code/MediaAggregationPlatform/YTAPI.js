const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

var oEmbedFormatArray = new Array();
var link = 'http://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D';
const fetch = require('node-fetch');

var getVideos = function getVideos()
{
    youtube.getPlaylist('https://www.youtube.com/playlist?list=PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-')
        .then(playlist => {
            playlist.getVideos()
                .then(videos => {
                    for (k = 0; k < 9; k++){
                        var oEmbed = link + videos[k].id + '&format=json';

                        fetch(oEmbed)
                            .then(
                                function(response) {
                                    response.json().then(function (data) {
                                        oEmbedFormatArray.push(data.html);
                                    });
                                }
                            )
                            .catch(function(err){
                                console.log('Fetch error', err);
                            });
                    }
                })
                .catch(console.log);
        })
        .catch(console.log);
    return oEmbedFormatArray;
}

exports.getVideos = getVideos;
