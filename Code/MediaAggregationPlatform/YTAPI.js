const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyDnR3rUOsnI9mTsFB4BT0LLJeGTN6liDYI');

var getVideo = function getVideo()
{
    youtube.getPlaylist('https://www.youtube.com/playlist?list=PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-')
        .then(playlist => {
            console.log(`The playlist's title is ${playlist.title}`);
            playlist.getVideos()
                .then(videos => {
                    for(k = 0; k < 10; k++)
                    {
                        console.log(`This playlist has ${videos.length === 50 ? '50+' : videos[k].id} videos.`);
                    }
                })
                .catch(console.log);
        })
        .catch(console.log);
}

getVideo();
