var movies = new Movies( );

var AppView = Backbone.View.extend({
	//el: set element of main div changing

	showPage: function(pageNum){
            console.log("showpage");
            movies.fetch({

            //upon success, run function
            success : function( ){
                  movies_view = new MoviesView({ }) //create collection view
                  _.each(movies.models, function(model){ //for each movie model in the collection, pass in that model
                        movies_view.addOne(model); //execute addOne method
                  });
            }
      });
	},

	showSingleMovieView: function(movie){
			movie = new Movie();
      		var view = new SingleMovieView({model: this.model});
      		view.render();
     		return this;
	},

	createMovieView: function(){

	},

	updateMovieView: function(){

	},
});
      