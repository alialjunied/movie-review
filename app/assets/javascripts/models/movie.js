//backbone to model client-side
	//MODEL
	Movie = Backbone.Model.extend({ 
		url : function(){
			return "http://cs3213.herokuapp.com/movies/" + this.get('id') + ".json"
		}
	});

	var movie = new Movie();
	movie.url = "http://cs3213.herokuapp.com/movies/4.json"

	movie.fetch({
		success : function( ){
			console.log(movie.get("title"));
		}
	});
