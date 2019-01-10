$(document).ready(function() {
var keyWord ;
var page ;
var id ;

function searchFilmImage(){
	
	if (keyWord!="" && keyWord!=undefined){
		$.ajax({
			method: "GET",
			url:"http://www.omdbapi.com/?apikey=5275f66d&s="+keyWord+"&page="+page
		})
		.done(function (response) {
			console.log(response);
			for(let i = 0; i <= response.Search.length-1 ;i++){
				$("#columCenter").append( "<br>");
				$("#columCenter").append( "<img class='Image' id='"+ response.Search[i].imdbID +"'src="+ response.Search[i].Poster+">" );
				id++
			}
		});
		page++
	}
}


  $("button").click(function(){
		$("img").remove();
		$("br").remove();
		page = 1;
		keyWord = $("#search").val();
		id = 0;
	  searchFilmImage();
  });



  $('body').on('click','.Image',function(){
	 // console.log($(this.id).t());
	  
	  $.ajax({
		method: "GET",
		url:"http://www.omdbapi.com/?apikey=5275f66d&i="+this.id
	})
	.done(function (content) {
		
		
		$(".fixed").remove();
		$("#columRight").append( "<div class='fixed'></div>");
		$(".fixed").append( "<p>Title: "+content.Title+"</p>" );
		$(".fixed").append( "<br>" );
		$(".fixed").append( "<p>Year: "+content.Year+"</p>" );
		$(".fixed").append( "<br>" );
		$(".fixed").append( "<p>Rated: "+content.Rated+"</p>" );
		$(".fixed").append( "<br>" );
		$(".fixed").append( "<p>Released: "+content.Released+"</p>" );
		$(".fixed").append( "<br>" );
		$(".fixed").append( "<p>Runetime: "+content.Runtime+"</p>" );
		$(".fixed").append( "<br>" );	
		$(".fixed").offset({ top: 100, left: 500 });
		//$( ".fixed" ).animate({top: pos }, 1500 );
	});
	})



	var win = $(window);
	win.scroll(function() {
		if ($(document).height() - win.height() <= win.scrollTop()+2) {
			searchFilmImage();
		}
	});
});
 


  