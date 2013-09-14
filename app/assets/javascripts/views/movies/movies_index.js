    _.templateSettings = {
    	interpolate: /\{\{=(.+?)\}\}/g,
    	escape: /\{\{-(.+?)\}\}/g,
    	evaluate: /\{\{(.+?)\}\}/g,
    };

	var MoviesView = Backbone.View.extend({
		el : ".movies", //the DOM Element class 'movies'
		addOne : function(model){ //function called addOne takes in a model
			
			view = new MovieView({ model : model }); //create a MovieView object specifying the model

			e1 = view.render();
			//var img = $('<img/>').attr({ 'src' : model.get('img_url') })
			//$(e1).append(img);

			$('div.movies').append(e1);
		}
	});
	//----------
	//VIEW

	var MovieView = Backbone.View.extend({
		tagName: "div", //insert into <ul> tag
		events : {
			"click" : "showMovie"
		},
		showMovie : function(){
			//TODO: show movie detials
			
			var id = this.model.id;
			var movie = new Movie({id: id});
			movie.url = "http://cs3213.herokuapp.com/movies/"+id+".json"

			movie.fetch({
				success : function(thisMovie){
					thisMovie.reviews.fetch({
						success: function(thisMovieReviews) {
							thisMovie.set("reviews", thisMovieReviews);
							var view = new SingleMovieView({model: movie});

							//console.log(movie);
							view.render();
		     			return this;

							}
						});
				}
			//var template = _.template($('#single-movie-template').html(), {model: this.model.toJSON()});
		});
		},
		render: function(){ //how to insert into <ul> tag
			$(this.el).attr("id",this.model.id);
			console.log(this.model);
			$(this.el).attr("class","test");
			//return $(this.el).text( this.model.get('title') ); //pass in model in new MovieView({ model : model}), we have access to this.model
			return $(this.el).html(
				"<div class='span3 movie'><h3 class='movie-title'><a href='/movies/"+ this.model.id +"'>"+ this.model.get("title") +"</a></h3><a href='/movies/"+ this.model.id +"'><img alt='A' src='"+ this.model.get("img_url") +"'></a></div>" );
		}
	});

	var SingleMovieView = Backbone.View.extend({        
 		el: "#single-movie-template",
		//template: _.template($("#single-movie-template").html()),
    render: function () {
				var template = _.template($("#single-movie-template").html(), {model: this.model.toJSON()});
    	 	$('.testa').html(template);
        //$("#app").html(template);
        return this;
    }
  });