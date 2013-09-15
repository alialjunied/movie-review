//var AppViewInst = new AppView();

var AppRouter = Backbone.Router.extend({
      // URL_Fragments : Method_Names
      routes: {
            //Display Page
            ""                 : "index",
            "page/:page"       : "movies_pagination", 
            "movies/:id"       : "show_Single_Movie",
            
            //Actions to Movies
            //"delete_movie/:id"    : "delete_movie", 
            "new_movie"        : "new_movie",
            "edit_movie/:id"        : "update_movie",
            "movie/:mid/review/delete/:rid" : "delete_review",
            "review/create/:movie_id"       : "create_review",

        },

      index: function() {
            AppViewInst.showPage(1);
      },


      show_Single_Movie : function (movie_id){
            AppViewInst.showSingleMovieView(movie_id);
      },


      new_movie: function() {
            AppViewInst.createMovieView();
      },

      update_movie: function(movie_id) {
            AppViewInst.updateMovieView(movie_id);
      }
});

