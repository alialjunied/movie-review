    _.templateSettings = {
    	interpolate: /\{\{=(.+?)\}\}/g,
    	escape: /\{\{-(.+?)\}\}/g,
    	evaluate: /\{\{(.+?)\}\}/g,
    };

    //Movie Listing View
	var MoviesView = Backbone.View.extend({
		el : ".row-movies", //the DOM Element class 'movies'
		addOne : function(model){ //function called addOne takes in a model
			
			view = new MovieView({ model: model }); //create a MovieView object specifying the model

			e1 = view.render();
			//var img = $('<img/>').attr({ 'src' : model.get('img_url') })
			//$(e1).append(img);

			$('div.row-movies').append(e1);
		}
	});

	//Single Line Movie View in List
	var MovieView = Backbone.View.extend({
		tagName: "div", //insert into <ul> tag
		//template: _.template($("#movie-template").html()),
		//el: ".movie-view",
		events : {
			"click" : "showMovie"
		},
		//initialize: function(){
		//	this.render();
		//}

		showMovie : function(){
			AppRouterInst.navigate('/movies/' + this.model.id, true);
			//AppRouter.show_Single_Movie(this.model.id);
		},
		render: function(){ //how to insert into <ul> tag
			//return $(this.el).html(
			//	"<div class='span3 movie'><h3 class='movie-title'>"+ this.model.get("title") +"</h3><img alt='A' src='"+ this.model.get("img_url") +"'></div>" );
			//$(this.el.movie).attr("id",this.model.id);
			//$(this.movie).attr("class","test");
			$('this.el').attr("id",this.model.id);
			$('this.el').attr("class","test");
			var template = _.template($("#movie-template").html(), {model: this.model.toJSON()} );
			//return $(".row-movies").html(template);
			return $(this.el).html(template);
		}
	});

	//----- Detailed Single Movie View
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

