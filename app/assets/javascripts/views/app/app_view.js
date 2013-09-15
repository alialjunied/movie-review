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

	showSingleMovieView: function(movie_id){
            
            var movie = new Movie({id: movie_id});
            movie.url = "http://cs3213.herokuapp.com/movies/"+movie_id+".json"

            movie.fetch({
                  success : function(thisMovie){
                        thisMovie.reviews.fetch({
                              success: function(thisMovieReviews) {
                                    thisMovie.set("reviews", thisMovieReviews);
                                    var view = new SingleMovieView({model: movie});
                                    view.render();
                                    return this;
                              }
                        });
                  }
            });
      },

	createMovieView: function(){
            var view = new CreateMovieView();
            view.render();
	},

      updateMovieView: function(movie_id){
            var movie = new Movie({id: movie_id});
            movie.url = "http://cs3213.herokuapp.com/movies/"+movie_id+".json"

            movie.fetch({
                  success : function(thisMovie){
                        thisMovie.reviews.fetch({
                              success: function(thisMovieReviews) {
                                    thisMovie.set("reviews", thisMovieReviews);
                                    var view = new UpdateMovieView({model: movie});
                                    view.render();
                                    return this;
                              }
                        });
                  }
            });
      }
});
      