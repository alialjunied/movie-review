//backbone to model client-side
	//MODEL
		//MODEL
	var Review = Backbone.Model.extend({ 

	});
		var ReviewList = Backbone.Collection.extend({
		model: Review
	});

	var Movie = Backbone.Model.extend({ 
		url : function(){
			return "http://cs3213.herokuapp.com/movies/" + this.get('id') + ".json"
		},
		initialize: function() {
		    this.reviews = new ReviewList();
    		this.reviews.url = "http://cs3213.herokuapp.com/movies/" + this.attributes.id + "/reviews.json";
    		
		}
	});

	var movie = new Movie();
	movie.url = "http://cs3213.herokuapp.com/movies/4.json"

	movie.fetch({
		success : function( ){
			console.log(movie.get("title"));
		}
	});