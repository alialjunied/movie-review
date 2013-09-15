    _.templateSettings = {
    	interpolate: /\{\{=(.+?)\}\}/g,
    	escape: /\{\{-(.+?)\}\}/g,
    	evaluate: /\{\{(.+?)\}\}/g,
    };

 
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }	
    }
    return cookieValue;
}
    //Movie Listing View
	var MoviesView = Backbone.View.extend({
		el : ".row-movies", //the DOM Element class 'movies'
		addOne : function(model){ //function called addOne takes in a model
			
			view = new MovieView({ model: model }); //create a MovieView object specifying the model

			e1 = view.render();
			//var img = $('<img/>').attr({ 'src' : model.get('img_url') })
			//$(e1).append(img);

			$('.row-movies').append(e1);
		},


	});

	//Single Line Movie View in List
	var MovieView = Backbone.View.extend({
		tagName: "div", //insert into <ul> tag
		//template: _.template($("#movie-template").html()),
		//el: "div",
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
			$(this.el).attr("id",this.model.id);
			$(this.el).attr("class","movie-view");
			var template = _.template($("#movie-template").html(), {model: this.model.toJSON()} );
			//return $(".row-movies").html(template);
			return $(this.el).html(template);
			//return template;
		}
	});
	//----- Detailed Single Movie View
	var SingleMovieView = Backbone.View.extend({        
 		el: ".testa",
 		
 		events : {
		"click #submit": "sendReview",
		"click #update_movie_btn": "update_movie",
		"click #delete-movie-btn": "delete_movie"
	},
		sendReview: function () {
			console.log("asdad");
		},

    	render: function (movie_id) {	
			var template = _.template($("#single-movie-template").html(), {model: this.model.toJSON()});
		 	$('.testa').html(template);
		 		$(".icon-remove").click(function(e){
		 			var movie_id = $(this).attr("movie_id");
		 			var review_id = $(this).attr("review_id");
		 			var token = getCookie("token");
					console.log(movie_id);
					console.log(review_id);
					console.log(token);
		 	 		var url = "http://cs3213.herokuapp.com/movies/" + movie_id + "/reviews/" + review_id + ".json";

			    $.ajax({
			    	type: "delete",
	        	url: url,
	        	data: {'access_token': token},
	        	success: function(result) {
	            AppRouterInst.navigate("/#movies/"+movie_id, true	);
	        	},
	        	error: function (xhr, status, err) {
	            console.log(xhr);
	       		}
	    		});

		 	 	});
		 		$('#submit').click(function(){

			 		var token = getCookie("token");
			 		var score = $.trim($("#review_score").val());
			 		var comment = $.trim($("#review_comment").val());
			 		if(score < 1 || score > 100) {
						alert("Please enter a score between 1 and 100");
		        return;
					}
					var data = {
			      'movie_id': movie_id,
			      'score': score,
			      'comment': comment,
			      'access_token': token
			    };
			    var url = "http://cs3213.herokuapp.com/movies/" + movie_id + "/reviews.json";
			    $.ajax({
		        url: url,
		        type: "POST",
		        dataType: "json",
		        headers: {'Content-Type':'application/json'},
		        data: JSON.stringify(data),
		        success: function(result) {
		            AppRouterInst.navigate("/#movies/"+movie_id, true	);
		        },
		        error: function (xhr, status, err) {
		            console.log(xhr);
		       	 }
			    });
	 			});
				return this;

    	},

    		update_movie: function() {
		window.location.href = "/#edit/" + this.model.id;
	},

	delete_movie: function () {
		var token = getCookie('token');
		console.log(token);
		if (token == "" || token == null) {
			alert("Sadly you cannot delete it before you sign in.");
			return;
		}

		var id = this.model.id;

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
        	 		window.location.href = "/#movies/" + id;
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

        $('#cancel-update-btn').click(function(){
            window.location.href = "/#movies/" + id;

        });


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
                    	 	if (error == 'Unauthorized') {
                    	 		alert('This is not your movie!');	                  
                    	 	}
                    	 	$("#update-btn").text("Update").removeAttr("disabled"); 
                    	 	window.location.href = '/#movies/' + id;
                  		}, 
		            	success: function(data) {
		            		console.log("success!");

		            		$("#update-btn").text("Update").removeAttr("disabled");
		            	    window.location.href = "/#movies/" + id;
		            	}
		         }); 
		    }
		});    
	},
});

    var CreateMovieView = Backbone.View.extend({
        render: function() {
            var template = _.template($("#add-movie-template").html(), {});
            $('.testa').html(template);

    		$("#submit-btn").click(function(){

    			var token = getCookie('token');
    			console.log(token);

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
		                    	 	alert('Your authentication has expired.');
		                    	 	window.location.href = '/';
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

