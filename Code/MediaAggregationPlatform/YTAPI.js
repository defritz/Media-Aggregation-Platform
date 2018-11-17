const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyDnR3rUOsnI9mTsFB4BT0LLJeGTN6liDYI');
oEmbedArray = new Array();
var oEmbedFormatArray = new Array();
var link = 'http://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D';
const fetch = require('node-fetch');

var getVideo = function getVideo()
{
    youtube.getPlaylist('https://www.youtube.com/playlist?list=PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-')
        .then(playlist => {
            console.log(`The playlist's title is ${playlist.title}`);
            playlist.getVideos()
                .then(videos => {
                    for (k = 0; k < 10; k++){
                        var oEmbed = link + videos[k].id + '&format=json';
                        /*

                        console.log(videos[k].id);
                        */
                        fetch(oEmbed)
                            .then(
                                function(response) {
                                    response.json().then(function (data) {
                                        /*
                                        console.log(data.html);
                                        */
                                        oEmbedFormatArray[k] = data.html;
                                        console.log(oEmbedFormatArray[k]);
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


getVideo();
