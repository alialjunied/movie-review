//COLLECTION
	var Movies = Backbone.Collection.extend({
		model : Movie //the collection is a collection of the model Movie
	});
	var movies = new Movies( );

	//specify location to get data to populate collection
	movies.url = "http://cs3213.herokuapp.com/movies.json"

	//pull (fetch) the data
	movies.fetch({

		//upon success, run anoymous function
		success : function( ){
			movies_view = new MoviesView({ }) //create collection view
			_.each(movies.models, function(model){ //for each movie model in the collection, pass in that model
				movies_view.addOne(model); //execute addOne method
			});
		}
	});