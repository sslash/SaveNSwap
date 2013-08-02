var app = app || {};

$(function( $ ) {
	'use strict';

	// Just holds events that belongs to the navigation!
	app.NavigationView = Backbone.View.extend({

		el : "#navigationId",

		template : _.template($("#navigation-template").html()),
		
		initialize : function() {
			if ( app.Registry.isLoggedIn())
				this.getSwapRequestsAndReplies(app.Registry.getUserId());
			else
				this.render();
		},

		render : function() {
			var obj = {};
			if (this.swapRequests != null){
				console.log("WE HAVE SWAP REQUESTS " );
				obj.swapRequests = this.swapRequests;
			}

			if ( this.swapReplies != null) {
				obj.swapReplies = this.swapReplies;
			}

			this.$el.html(this.template({
				data : obj
			}));		
		},

		events: {		
			'click #registerUser': 'registerUser',
			'click #signinButton': 'authenticate',
			'click .accSwapBtn' : 'acceptSwap',
			'click .rejSwapBtn' : 'rejectSwap',
			'click #sndRplyBtn' : 'sendAcceptSwap',
			'click .finishSwap' : 'finishSwap',
			'click .regIfNot' : "registerIfNot",
			'click .signOutBtn' : "signOut"
		},		

		signOut : function(event) {
			event.preventDefault();
			app.Registry.logOut();
			this.render();
			app.TodoRouter.navigate("",{trigger: true, replace: true});					
		},

		// Entered when user is in sign-in modal!
		registerIfNot : function(event) {
			event.preventDefault();
			console.log("will reg cause not");
			$('#signInModal').modal('hide');
			$('#signUpModal').modal('show');
		},

		finishSwap : function(event) {
			var id = event.currentTarget.id.split("_")[1];
			console.log("finish swap, will delete " + id);
			var that = this;

			new app.SwapReply({id : id}).destroy(
				{success: function(model,response){
					console.log("deleted " + response);
					that.render();
				}});
		},

		acceptSwap : function(event) {
			var id = event.currentTarget.id.split("_")[1];
			this.swapId = event.currentTarget.id.split("_")[2];
			console.log("ACC SWAP id: " + this.swapId);
			this.swapReplyId = id;
			$('#sendSwapReply').modal('show');	
		},

		sendAcceptSwap : function(){		
			console.log("send accept swap " + this.swapId);
			var that = this;
			
			new app.SwapReply().save({
				fromId : app.Registry.getUserId(),
				toId : this.swapReplyId,
				answ : $('#accSwapText').val(),
			}, { success : function(res){
				console.log("Reply was sent! will destroy request");

				new app.SwapRequest({id:that.swapId}).destroy({
					success : function(model, response) {
						console.log("delete success " + response);
						that.render();
					}
				});
			}});
		},

		rejectSwap : function(event) {
			var id = event.currentTarget.id.split("_")[1];
			var swapId = event.currentTarget.id.split("_")[2];
			console.log("REJ SWAP: " + i);
			new app.SwapReply().save({
				fromId : app.Registry.getUserId(),
				toId : id,
				answ : "No"
			}, { success : function(res){
				console.log("Reply was sent! Will destroy request");

				new app.SwapRequest({id:swapId}).destroy({
					success : function(model, response) {
						that.render();
					}
				});

			}});
		},

		
		authenticate : function(event) {
			event.preventDefault();
			var email= $('#loginEmail').val(),
				password= $('#loginPass').val();

			var that = this;
			var auth = $.post("/authenticate",
			{
				email: email,
				password: password
			})
			.done( function(res) {			 	
			 	if ( !res) {
			 		$('#wrngPas').html("Wrong email or password!");
			 	} else {
			 		$('#signInModal').modal('hide');
			 		
			 		// Hacky solution to remove the modal
			 		app.Registry.setUser(res);
			 		$.get("/api/things/user/" + res._id)			 		
			 		.done(function (res){
			 			app.Registry.setUsersThings(res);
			 		})
			 		.done(function(){
			 			that.getSwapRequestsAndReplies(res._id);
			 			app.TodoRouter.navigate("/home",{trigger: true});	
			 		});
			 	}
			 })
		},

		getSwapRequestsAndReplies : function(userId) {
			var that = this;
			$.get('/api/swapRequests/' + userId)	 		
	 		.done( function(res) {
	 			console.log(JSON.stringify(res));
			 	if ( res && res.length > 0 ){
			 		that.swapRequests = res;
			 	}else {
	 				// Must clean up. In case 
	 				// some others logs in in same "session"
	 				that.swapRequests = null;
	 			}

	 			// get replies
	 			$.get('/api/swapReplies/' + userId, function(res) {
	 				if ( res && res.length > 0 ){
			 			that.swapReplies = res;
			 		}else {
	 					that.swapReplies = null;
	 				}
	 				that.render();
	 			});
	 		});			
	 	},		

		registerUserSuccess : function() {
			$('#signUpModal').modal('hide');
			app.TodoRouter.navigate("profile",
				{trigger: true, replace: true});					
		},

		registerUser : function(event) {
			event.preventDefault();
			var pass =  $("#inputPassword1").val();
			if ( pass !== $("#inputPassword2").val() ) {
				$('#passMatch').html('Passwords don\'t match!');
				return false;
			}

			var user = new app.User({
				username : $("#inputUsername").val(),
				email : $("#inputEmail").val(),
				password : pass,
				created : new Date(),
				imgPath : "unknown.gif"
			});

			var that = this;
			user.save(null, {
				success: function(res) {
					app.Registry.setUser(res);
					that.registerUserSuccess();
				}
			});
		},


		uploadFile : function(obj) {
			var that = this;
			var file = obj.file;

			var data = new FormData();
			data.append("file", file);

			$.ajax({
				url : '/api/file',
				type : 'POST',
				data : data,
				success : function(res) {
					obj.handler();
				},
				error : function(res) {
				},
				//Options to tell JQuery not to process data or worry about content-type
				cache : false,
				contentType : false,
				processData : false
			});
		}
	});
});
