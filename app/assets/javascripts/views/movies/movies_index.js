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

			e1 = view.render();
			//var img = $('<img/>').attr({ 'src' : model.get('img_url') })
			//$(e1).append(img);

			$('div.movies').append(e1);
		}
	});

	//Single Line Movie View in List
	var MovieView = Backbone.View.extend({
		tagName: "div", //insert into <ul> tag
		events : {
			"click" : "showMovie"
		},
		showMovie : function(){
			AppRouterInst.navigate('/movies/' + this.model.id, true);
			//AppRouter.show_Single_Movie(this.model.id);
		},
		render: function(){ //how to insert into <ul> tag
			$(this.el).attr("id",this.model.id);
			console.log(this.model);
			$(this.el).attr("class","test");
			//return $(this.el).text( this.model.get('title') ); //pass in model in new MovieView({ model : model}), we have access to this.model
			return $(this.el).html(
				"<div class='span3 movie'><h3 class='movie-title'>"+ this.model.get("title") +"</h3><img alt='A' src='"+ this.model.get("img_url") +"'></div>" );
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

    var CreateMovieView = Backbone.View.extend({
        el: '#add-movie-template',
        events: {

        },
        render: function() {
            var template = _.template($("#add-movie-template").html(), {});
            $('.testa').html(template);
            return this;
        }
    });

