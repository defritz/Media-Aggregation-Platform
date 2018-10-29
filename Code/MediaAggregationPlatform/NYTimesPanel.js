request.get({
    url: "https://api.nytimes.com/svc/topstories/v2/home.json",
    qs: {
        'api-key': "4e593db0965b429098b05d078a88fa2b"
    },
}, function(err, response, body) {
    body = JSON.parse(body);
    console.log(body);
})
