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
		el : ".movies", //the DOM Element class 'movies'
		addOne : function(model){ //function called addOne takes in a model
			
			view = new MovieView({ model : model }); //create a MovieView object specifying the model

			e1 = view.render();
			//var img = $('<img/>').attr({ 'src' : model.get('img_url') })
			//$(e1).append(img);

			$('div.movies').append(e1);
		}
	});

	//Single Line Movie View in List
	var MovieView = Backbone.View.extend({
		tagName: "div", //insert into <ul> tag
		events : {
			"click" : "showMovie"
		},
		showMovie : function(){
			AppRouterInst.navigate('/movies/' + this.model.id, true);
			//AppRouter.show_Single_Movie(this.model.id);
		},
		render: function(){ //how to insert into <ul> tag
			$(this.el).attr("id",this.model.id);
			console.log(this.model);
			$(this.el).attr("class","test");
			//return $(this.el).text( this.model.get('title') ); //pass in model in new MovieView({ model : model}), we have access to this.model
			return $(this.el).html(
				"<div class='span3 movie'><h3 class='movie-title'>"+ this.model.get("title") +"</h3><img alt='A' src='"+ this.model.get("img_url") +"'></div>" );
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
    render: function () {

		var template = _.template($("#single-movie-template").html(), {model: this.model.toJSON()});
	 	$('.testa').html(template);
	 	
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

