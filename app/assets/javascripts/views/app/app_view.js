var movies = new Movies( );

var AppView = Backbone.View.extend({
	//el: set element of main div changing

	showPage: function(pageNum){
            console.log(pageNum);
            $("div.row-movies").empty();
           //movies.url = movies.url + "?" + $.param({page: pageNum});

            movies.fetch({
                  //using jquery param method to add param to url
                  data: $.param({page: pageNum}),
                  
                  //upon success, run function
                  success : function(data){
                        movies.reset(data.models)
                        movies_view = new MoviesView({ }) //create collection view
                        _.each(movies.models, function(model){ //for each movie model in the collection, pass in that model
                              movies_view.addOne(model); //execute addOne method
                        });
                  },

                  error: function(error){
                      console.log(error);
                  }
            });
            //get previous and next page numbers from current page number
            var prev_page_num = parseInt(pageNum) - 1;
            if (prev_page_num < 1){
                  prev_page_num = 1;
            }
            var next_page_num = parseInt(pageNum) + 1;

            //set the html elements
            $('#prevPage').attr("href", "/#page/"+prev_page_num);
            $('#nextPage').attr("href", "/#page/"+next_page_num);
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
                                    view.render(movie.id);
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
      