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
	  let pos = $(this).position('#columCenter') ;
	  let h = this.height;
	  let zindex =$(this).css("z-index");
	  $.ajax({
		method: "GET",
		url:"http://www.omdbapi.com/?apikey=5275f66d&i="+this.id
	})
	.done(function (content) {
		$(".fixed").remove();
		$("#columCenter").append( "<div style='position: absolute' class='fixed'></div>");
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
		$(".fixed").css("background-color","rgba(255, 255, 255, 0.8)");
		let borw = $(window).scrollTop();
		$(".fixed").offset({ top:  borw - h, left: 0 });
		$(".fixed > p").offset({  left: 500 });
		$(".fixed").css( "zIndex", -1 );
		$(".fixed" ).animate({top: pos.top+20 }, 1500 );
	});
	})

	var win = $(window);
	win.scroll(function() {
		if ($(document).height() - win.height() <= win.scrollTop()+2) {
			searchFilmImage();
		}
	});
});
 


  