const NYT = require('nyt-top');
NYT.key(process.env.NYTIMES_API_KEY);

var getNews = function getNews() {
    var titleArray = new Array();
    var abstractArray = new Array();
    var imageArray = new Array();
    var articlesImages = [titleArray, abstractArray, imageArray];

    NYT.section('world', function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            var results = data.results;
            titleArray.push(results[0].title);
            abstractArray.push(results[0].abstract);
            imageArray.push(results[0].multimedia[0].url);
            //body = JSON.parse(body);
            //console.log(body);
        }
    })
    return articlesImages;
}

exports.getNews = getNews;