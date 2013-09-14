//COLLECTION
	var Movies = Backbone.Collection.extend({
		model : Movie, //the collection is a collection of the model Movie
		url : "http://cs3213.herokuapp.com/movies.json"
	});
