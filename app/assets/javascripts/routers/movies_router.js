var AppRouter = Backbone.Router.extend({
routes: {
            "" : "index",
            "page/:page" : "movies_pagination",
            "movies/:id" : "view_movie",
            "movie/delete/:id" : "delete_movie",
            "movie/update/:id" : "update_movie",
            "new_movie" : "new_movie",
            "movie/:mid/review/delete/:rid" : "delete_review",
            "logout" : "logout",
            "review/create/:movie_id" : "create_review",
        },

});
