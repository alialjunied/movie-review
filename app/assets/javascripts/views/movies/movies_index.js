    _.templateSettings = {
    	interpolate: /\{\{=(.+?)\}\}/g,
    	escape: /\{\{-(.+?)\}\}/g,
    	evaluate: /\{\{(.+?)\}\}/g,
    };

	var MoviesView = Backbone.View.extend({
		el : ".movies", //the DOM Element class 'movies'
		addOne : function(model){ //function called addOne takes in a model
			
			view = new MovieView({ model : model }); //create a MovieView object specifying the model

			e1 = view.render()
			var img = $('<img/>').attr({ 'src' : model.get('img_url') })
			$(e1).append(img);

			$('ul.movies').append(e1);
		}
	});
	//----------
	//VIEW

	var MovieView = Backbone.View.extend({

		tagName: "li", //insert into <ul> tag
		events : {
			"click" : "showMovie"
		},
		showMovie : function(){
			//TODO: show movie detials
			//$(".movies").html("<h1>sadd</h1>");
			movie = new Movie();
			//var id = this.id;
			//console.log(movie.get("id"));
			//var id = this.model.get("id");
	
      		var view = new SingleMovieView({model: this.model});

			//var template = _.template($('#single-movie-template').html(), {model: this.model.toJSON()});
      		view.render();
     		return this;	

		},
		render: function(){ //how to insert into <ul> tag
			$(this.el).attr("id",this.model.id);
			$(this.el).attr("class","test");
			return $(this.el).text( this.model.get('title') ); //pass in model in new MovieView({ model : model}), we have access to this.model
			
		}
	});

	 var SingleMovieView = Backbone.View.extend({        
 	el: "#single-movie-template",
		//template: _.template($("#single-movie-template").html()),
        render: function () {
        		console.log(this.model.get("title"));
        		var template = _.template($("#single-movie-template").html(), {model: this.model.toJSON()});
            $('#app').html(template);
            //$("#app").html(template);
            return this;
        }
    });
	 	var movies = new Movies( );

	//pull (fetch) the data
		movies.fetch({

		//upon success, run anoymous function
		success : function( ){
			movies_view = new MoviesView({ }) //create collection view
			_.each(movies.models, function(model){ //for each movie model in the collection, pass in that model
				movies_view.addOne(model); //execute addOne method
			});
		}
	});
