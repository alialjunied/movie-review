window.MovieReview = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    initialize: function() {
    	window.AppRouterInst = new AppRouter();
    	window.AppViewInst = new AppView();
        Backbone.history.start();
        //{ pushState: true} 
    }
};

$(document).ready(function() {
  	return MovieReview.initialize();
});


 



