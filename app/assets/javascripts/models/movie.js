//backbone to model client-side
	var Review = Backbone.Model.extend({ 

	});



	var ReviewList = Backbone.Collection.extend({
		model: Review,
		url : function(){
			return "http://cs3213.herokuapp.com/movies/" + this.id + "/reviews.json"
		},
	});
	var Movie = Backbone.Model.extend({ 
		url : function(){
			return "http://cs3213.herokuapp.com/movies/" + this.get('id') + ".json"
		},
		initialize: function() {
		    this.reviews = new ReviewList();
    		this.reviews.url = "http://cs3213.herokuapp.com/movies/" + this.attributes.id + "/reviews.json";
		}
	});