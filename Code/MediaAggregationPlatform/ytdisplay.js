function videosListMostPopular(auth, requestData) {
    var service = google.youtube('v3');
    var parameters = removeEmptyParameters(requestData['params']);
    parameters['auth'] = auth;
    service.videos.list(parameters, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        console.log(response);
    });
}

/*
//See full code sample for authorize() function code.
authorize(JSON.parse(content), {'params': {'chart': 'mostPopular',
        'regionCode': 'US',
        'part': 'snippet,contentDetails,statistics',
        'videoCategoryId': ''}}, videosListMostPopular);
*/