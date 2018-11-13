const NYT = require('nyt-top');
NYT.key(process.env.NYTIMES_API_KEY);

var getNews = function getNews() {
    var titleArray = new Array();
    var abstractArray = new Array();
    var urlArray = new Array();
    var articleInfo = [titleArray, abstractArray, urlArray];

    NYT.section('world', function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            var results = data.results;
            for(i = 0; i < 9; i++){
                titleArray.push(results[i].title);
                abstractArray.push(results[i].abstract);
                urlArray.push(results[i].url);
            }
        }
    })
    return articleInfo;
}

exports.getNews = getNews;