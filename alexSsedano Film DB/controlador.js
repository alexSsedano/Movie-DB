var keyWord;
var page;
$(document).ready(function(){
  $("button").click(function(){
	  keyWord = $("#search").val();
	  page =1;
	$.ajax({
		method: "GET",
		url:"http://www.omdbapi.com/?apikey=5275f66d&s="+keyWord+"&page="+page
	})
	.done(function (response) {
		console.log(response);
		for(let i =0; i <= response.Search.length-1 ;i++){
	  			$("#columCenter").append( '<img src='+ response.Search[i].Poster+'>' );
	}
	});
	  page++
  });
});


$(document).ready(function() {
	var win = $(window);

	// Each time the user scrolls
	win.scroll(function() {
		// End of the document reached?
		if ($(document).height() - win.height() == win.scrollTop()) {
			$.ajax({
				method: "GET",
				url:"http://www.omdbapi.com/?apikey=5275f66d&s="+keyWord+"&page="+page
			})
			.done(function (response) {
				console.log(response);
				for(let i =0; i <= response.Search.length-1 ;i++){
							$("#columCenter").append( '<img src='+ response.Search[i].Poster+'>' );
			}
			});
				page++
			

			
		}
	});
});
 
