var getVideos = function getVideos() {
    const YouTube = require('simple-youtube-api');
    const youtube = new YouTube('AIzaSyBZcXUmrlUlMm7465BOGLQwZ-TyEtYY9LU');

    var videoArray = new Array();

    youtube.getPlaylist('https://www.youtube.com/playlist?list=PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-')
        .then(playlist => {
            console.log(`The playlist's title is ${playlist.title}`);
            playlist.getVideos()
                .then(videos => {
                    console.log(`This playlist has ${videos.length === 50 ? '50+' : videos.length} videos.`);
                    for(i = 0; i < 10; i++){
                        videoArray.push(videos[i].title);
                    }
                }).catch(console.log);
        })
        .catch(console.log);
    return videoArray;
}

exports.getVideos = getVideos;