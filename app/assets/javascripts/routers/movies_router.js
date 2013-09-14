var AppRouter = Backbone.Router.extend({
routes: {
            "" : "index",
            "page/:page" : "movies_pagination",
            "movies/:id" : "showMovie",
            "movie/delete/:id" : "delete_movie",
            "movie/update/:id" : "update_movie",
            "new_movie" : "new_movie",
            "movie/:mid/review/delete/:rid" : "delete_review",
            "logout" : "logout",
            "review/create/:movie_id" : "create_review",
        },


showMovie: function(id) {
          
}
});
var AppRouterInstance = new AppRouter();
Backbone.history.start();