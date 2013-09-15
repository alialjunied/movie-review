//var AppViewInst = new AppView();

var AppRouter = Backbone.Router.extend({
      // URL_Fragments : Method_Names
      routes: {
            //Display Page
            ""                 : "index",
            "page/:page_num"       : "show_page", 
            "movies/:id"       : "show_single_movie",
            
            //Actions to Movies
            "movie/update/:id" : "update_movie",
            "movie/delete/:id" : "delete_movie",
            "create_movie"        : "create_movie",
            "movie/:mid/review/delete/:rid" : "delete_review",
            "review/create/:movie_id"       : "create_review",

            "logout"           : "logout",

        },

      index: function() {
            AppViewInst.showPage(1);
      },

      show_page: function(page_num) {
            AppViewInst.showPage(page_num);
      },


      show_single_movie : function (movie_id){
            AppViewInst.showSingleMovieView(movie_id);
      },


      create_movie: function() {
          AppViewInst.createMovieView();
      },

});

