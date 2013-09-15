var AppViewInst = new AppView();

var AppRouter = Backbone.Router.extend({
      // URL_Fragments : Method_Names
      routes: {
            //Display Page
            ""                 : "index",
            "page/:page"       : "movies_pagination", 
            "movies/:id"       : "show_Single_Movie",
            
            //Actions to Movies
            "movie/update/:id" : "update_movie",
            "movie/delete/:id" : "delete_movie",
            "new_movie"        : "new_movie",
            "movie/:mid/review/delete/:rid" : "delete_review",
            "review/create/:movie_id"       : "create_review",

            "logout"           : "logout",
        },

      index: function() {
            AppViewInst.showPage(1);
      },

      show_Single_Movie : function (movie_id){
            //get movie info from API Server
            var movie = new Movie({movie_id: movie_id + ".json"});
            AppView.showSingleMovieView(movie_id, movie);
      }

});

