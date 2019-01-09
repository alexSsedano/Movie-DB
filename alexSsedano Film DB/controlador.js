var keyWord;
var page ;

function searchFilmImage(){
	if (keyWord!=""){
	  
		$.ajax({
			method: "GET",
			url:"http://www.omdbapi.com/?apikey=5275f66d&s="+keyWord+"&page="+page
		})
		.done(function (response) {
			for(let i =0; i <= response.Search.length-1 ;i++){
				$("#columCenter").append( '<img src='+ response.Search[i].Poster+'>' );
				$("#columCenter").append( "<br>");
			}
		});
		page++
	}
}



$(document).ready(function(){
  $("button").click(function(){
		$("img").remove();
		$("br").remove();
		page =1;
		keyWord = $("#search").val();
	  searchFilmImage();
  });
});


$(document).ready(function() {
	var win = $(window);
	win.scroll(function() {
		if ($(document).height() - win.height() == win.scrollTop()) {
			searchFilmImage();
		}
	});
});
 
