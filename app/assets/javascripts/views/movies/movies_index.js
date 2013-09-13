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
			$(".movies").html("<h1>sadd</h1>");
		},
		render: function( ){ //how to insert into <ul> tag
			return $(this.el).text( this.model.get('title') ); //pass in model in new MovieView({ model : model}), we have access to this.model
		}
	});