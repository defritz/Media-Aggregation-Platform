$(document).ready(function(){
	$.get(
		"https://www.googleapis.com/youtube/v3/videos", {
			part: 'contentDetails',
			chart: 'mostPopular',
			maxResults: 10,
			key: 'AIzaSyDnR3rUOsnI9mTsFB4BT0LLJeGTN6liDYI'},
		function(data){
			var output;
			$.each(data.items, function(i, item){
				console.log(item);
				vidID = item.id;
				output = '<li><iframe src = \"//www.youtube.com/embed/'+vidID+'\"></iframe></li>';
				
				//append to results list
				$('#results').append(output);
			})
		}
	);
});