//backbone to model client-side
	//MODEL
	var Movie = Backbone.Model.extend({ 
		//set root url to get info
		urlRoot: "http://cs3213.herokuapp.com/movies/",
		//load its reviews when created
		initialize: function(){
			this.reviews = new Reviews;
			this.reviews.url = "http://cs3213.herokuapp.com/movies/" + this.id.toString() + "/reviews.json"
		}
	});