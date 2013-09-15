    _.templateSettings = {
    	interpolate: /\{\{=(.+?)\}\}/g,
    	escape: /\{\{-(.+?)\}\}/g,
    	evaluate: /\{\{(.+?)\}\}/g,
    };

    //Movie Listing View
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

	//Single Line Movie View in List
	var MovieView = Backbone.View.extend({

		tagName: "li", //insert into <ul> tag
		events : {
			"click" : "showMovie"
		},
		showMovie : function(){
			AppRouter.show_movie(this.model.get("id"));
			/*
			movie = new Movie();
      		var view = new SingleMovieView({model: this.model});
      		view.render();
     		return this;
     		*/

		},
		render: function(){ //how to insert into <ul> tag
			$(this.el).attr("id",this.model.id);
			$(this.el).attr("class","test");
			return $(this.el).text( this.model.get('title') ); //pass in model in new MovieView({ model : model}), we have access to this.model
			
		}
	});

	//----- Detailed Single Movie View

	 var SingleMovieView = Backbone.View.extend({        
 		el: "#single-movie-template",
		//template: _.template($("#single-movie-template").html()),
        render: function () {
        	console.log(this.model.get("title"));
        	var template = _.template($("#single-movie-template").html(), {model: this.model.toJSON()});
            $('#app').html(template);
            return this;
        }
    });
