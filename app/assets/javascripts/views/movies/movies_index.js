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

	var ReviewList = Backbone.Collection.extend({
		model: Review,
		url : function(){
			return "http://cs3213.herokuapp.com/movies/" + this.id + "/reviews.json"
		},
	});
	/*
function getCookie(name) {
	console.log(document.cookie);
  var parts = document.cookie.split(name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}*/
	//----- Detailed Single Movie View
	var SingleMovieView = Backbone.View.extend({        
 		el: ".testa",
 		
 		events : {
			"click .submit" : "sendReview"
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
		 	 		var url = "http://cs3213.herokuapp.com/movies/" + movie_id + ".json/reviews/" + review_id + ".json";

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

    }
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

