$(document).ready(function() {
	
var keyWord ;
var page ;
var id ;

function searchFilmImage(){
	
	if (keyWord!="" && keyWord!=undefined){
		$.ajax({
			method: "GET",
			url:"https://www.omdbapi.com/?apikey=5275f66d&s="+keyWord+"&page="+page
		})
		.done(function (response) {
			
			for(let i = 0; i <= response.Search.length-1 ;i++){
				$("#columCenter").append( "<br>");
				$("#columCenter").append( "<img class='Image' id='"+ response.Search[i].imdbID +"'src="+ response.Search[i].Poster+">" );
				$(" .Image").css("margin-left", "30px");
				id++
			}
		});
		page++
	}
}



$(".search").append( "<input type='text' id='search' name='search' value=''/>");
$(".search").append( "<button id='button' type='button'>Search</button>");
$(".search").hide();
$("#columCenter").append( "<div style='position: absolute' class='initial'></div>");
$(".initial").append( "<input type='text' class='iSearch' name='search' value=''/>" );
$(".initial").append( "<br>" );
$(".initial").append( "<button class='initialSearch' type='button'>Search</button>" );
$(".initial").css("top", "50%");
$(".initial").css("width", "100%");
$(".initial").css("height", "200px");
$(".initial").css("background-color", "rgba(0, 0, 0, 0.8)");
$(".iSearch, .initialSearch").css("margin-left", "35%");
$(".search > input").css("width", "300px");
$(".search > button, .search > input").css("margin-left", "10px");
$(".iSearch, .initialSearch").css("margin-top", "40px");
$(".iSearch, .initial > button").css("width", "30%");
$(".iSearch, input, button").css("height", "30px");
$(" button, input").css("border-radius"," 5px 5px 5px 5px");

$(".initial > button").click(function(){
	page = 1;
	keyWord = $(".iSearch").val();
	id = 0;
	$(".initial").fadeOut( 300 , searchFilmImage());
	$(".search").show(500);
});
  
  $(".search > button").click(function(){
	$(".fixed").remove();
	$("img").remove();
	$("br").remove();
	page = 1;
	keyWord = $("#search ").val();
	id = 0;
	searchFilmImage();
});

$('body').on('click','.Image',function(){
	let pos = $(this).position('#columCenter') ;
	let h = this.height;
	let zindex =$(this).css("z-index");
	$.ajax({
	method: "GET",
	url:"https://www.omdbapi.com/?apikey=5275f66d&i="+this.id
})
	.done(function (content) {
		console.log(content);
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








 


  