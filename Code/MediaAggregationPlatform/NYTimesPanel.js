request.get({
    url: "https://api.nytimes.com/svc/topstories/v2/home.json",
    qs: {
        'api-key': process.env.NYT_API_KEY
    },
}, function(err, response, body) {
    body = JSON.parse(body);
    console.log(body);
})
