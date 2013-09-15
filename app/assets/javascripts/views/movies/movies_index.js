_.templateSettings = {
	interpolate: /\{\{=(.+?)\}\}/g,
	escape: /\{\{-(.+?)\}\}/g,
	evaluate: /\{\{(.+?)\}\}/g,
};

function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
	  c_start = c_value.indexOf(c_name + "=");
	}
	
	if (c_start == -1) {
		c_value = null;
	} else {
	  	c_start = c_value.indexOf("=", c_start) + 1;
	  	var c_end = c_value.indexOf(";", c_start);
	  	if (c_end == -1) {
			c_end = c_value.length;
	 	}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function checkToken() {
	var token = getCookie('token');
	console.log(token);
	if (token == "" || token == null) {
		alert("Sadly you cannot before you sign in.");
		return false;
	}
	return true;
}

//Movie Listing View
var MoviesView = Backbone.View.extend({
	el : ".row-movies", //the DOM Element class 'movies'
	addOne : function(model){ //function called addOne takes in a model
		
		view = new MovieView({ model: model }); //create a MovieView object specifying the model

		e1 = view.render();
		//var img = $('<img/>').attr({ 'src' : model.get('img_url') })
		//$(e1).append(img);

		$('div.row-movies').append(e1);
	}
});

//Single Line Movie View in List
var MovieView = Backbone.View.extend({
	tagName: "div", //insert into <ul> tag
	//template: _.template($("#movie-template").html()),
	//el: ".movie-view",
	events : {
		"click" : "showMovie"
	},
	//initialize: function(){
	//	this.render();
	//}

	showMovie : function(){
		AppRouterInst.navigate('/movies/' + this.model.id, true);
		//AppRouter.show_Single_Movie(this.model.id);
	},
	render: function(){ //how to insert into <ul> tag
		//return $(this.el).html(
		//	"<div class='span3 movie'><h3 class='movie-title'>"+ this.model.get("title") +"</h3><img alt='A' src='"+ this.model.get("img_url") +"'></div>" );
		//$(this.el.movie).attr("id",this.model.id);
		//$(this.movie).attr("class","test");
		$('this.el').attr("id",this.model.id);
		$('this.el').attr("class","test");
		var template = _.template($("#movie-template").html(), {model: this.model.toJSON()} );
		//return $(".row-movies").html(template);
		return $(this.el).html(template);
	}
});

//----- Detailed Single Movie View
var SingleMovieView = Backbone.View.extend({        
		el: ".testa",
		events : {
		"click .submit": "sendReview",
		"click #update_movie_btn": "update_movie",
		"click #delete-movie-btn": "delete_movie"
	},
	sendReview: function () {
		console.log("asdad");
	},

	render: function () {
		var template = _.template($("#single-movie-template").html(), {model: this.model.toJSON()});
 		$('.testa').html(template);
	},

	update_movie: function() {
		window.location.href = "/#edit/" + this.model.id;
	},

	delete_movie: function () {
		var token = getCookie('token');
		console.log(token);
		if (token == "" || token == null) {
			alert("Sadly you cannot before you sign in.");
			return;
		}

		console.log(this.model.id);

		$.ajax({
        	url: "http://cs3213.herokuapp.com/movies/" + this.model.id + ".json",
        	type: 'delete',
        	dataType: 'json',
        	data: {'access_token': token},
        	error: function(jqXHR, textStatus, error) {
        	 	console.log(textStatus + ": " + error);
        	 	//alert('Oops an error occurred.');
        	 	if (error == 'Unauthorized') {
        	 		alert('This is not your movie!');
        	 	}
      		}, 
        	success: function(data) {
        		console.log("success!");
        	    window.location.href = "/";
        	}
     	}); 
	}
});

var UpdateMovieView = Backbone.View.extend({
	render: function(){

		var template = _.template($("#update-movie-template").html(), {model: this.model.attributes});
		$('.testa').html(template);

		var token = getCookie('token');
		console.log(token);
		if (token == "" || token == null) {
			alert("Sadly you cannot before you sign in.");
			return;
		}
 		$('#update_title').val(this.model.attributes.title);
 		$('#update_summary').val(this.model.attributes.summary);
 		var id = this.model.id;

 		$("#update-btn").click(function(){

			var summary, title, img; 
			title = $('#update_title').val();
			summary = $('#update_summary').val();
			img = $("update_image").val();

			if (title == "" || summary == "") {
		           alert("Please provide complete data!");
		    } else {

		    	   $("#update-btn").text("Updating...").attr('disabled', 'disabled');
		           var formData = new FormData();

		           console.log('new: ' + id + ", " + title + ", " + summary);

		           formData.append('id', id);
		           formData.append('title', title);
		           formData.append('summary', summary);
		           if(img != "") {
		           		formData.append('img', img);
		           }
		           formData.append("access_token", token);
		           $.ajax({
		            	url: "http://cs3213.herokuapp.com/movies/" + id + ".json",
		            	type: "put",
		            	data: formData,
		            	cache: false,
		            	contentType: false,
		            	processData: false,
		            	error: function(jqXHR, textStatus, error) {
                    	 	console.log(textStatus + ": " + error);
                    	 	alert('Oops an error occurred.');
                    	 	$("#update-btn").text("Update").removeAttr("disabled"); 
                  		}, 
		            	success: function(data) {
		            		console.log("success!");

		            		//$("#update-btn").text("Update").removeAttr("disabled");
		            	    // window.location.href = "/#movies/" + id;
		            	}
		         }); 
		    }
		});    
	},
});

var CreateMovieView = Backbone.View.extend({
    render: function() {

    	console.log('create movie view');

        var template = _.template($("#add-movie-template").html(), {});
        $('.testa').html(template);

		$("#submit-btn").click(function(){

			var token = getCookie('token');
			console.log(token);
			if (token == "" || token == null) {
				alert("Sadly you cannot before you sign in.");
				return;
			}

			var summary, title, img; 
			title = $('#movie_title').val();
			summary = $('#movie_summary').val();
			img = $('#movie_img').val();

			if (title == "" || summary == "" || img == "") {
		           alert("Please provide complete data!");
		    } else {
		    	   $("#submit-btn").text("Creating...").attr('disabled', 'disabled');
		           var formData = new FormData($("#new_movie_form")[0]);
		           formData.append("access_token", token)
		           $.ajax({
		            	url: "http://cs3213.herokuapp.com/movies.json",
		            	type: "post",
		            	data: formData,
		            	cache: false,
		            	contentType: false,
		            	processData: false,
		            	error: function(jqXHR, textStatus, error) {
                    	 	console.log(textStatus + ": " + error);
                    	 	alert('Oops an error occurred.');
                    	 	$("#submit-btn").text("Create").removeAttr("disabled"); 
                  		}, 
		            	success: function(data) {
		            		console.log("success!");
		            		$("#submit-btn").text("Create").removeAttr("disabled");
		            	    window.location.href = "/#movies/" + data.id;
		            	}
		         }); 
		    }
		});    
        return this;
    },
});

