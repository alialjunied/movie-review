window.MovieReview = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
      var AppRouterInst = new AppRouter();
      Backbone.history.start();
  }
};

$(document).ready(function() {
  return MovieReview.initialize();
});



 



