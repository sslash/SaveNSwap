var app = app || {};

$(function( $ ) {
	'user strict';

	app.ProfileView = Backbone.View.extend({

		//el : $('#mainBannerId'),

		template : _.template($('#profile-template').html()),

		// model = app.User
		initialize : function () {
			this.model = new app.User({id : this.options.modelId});
			this.loveEnvBlog = new app.LoveEnvBlog({
				owner:this.options.modelId
			});
			this.loveEnvBlog.on('change', this.renderEnvBlog, this);
		},

		events : {
			"submit #addBlogPost" : "addBlogPost",
			"mouseenter .artifact-prThingsap" : "howerTree",
			"mouseleave .artifact-prThingsap" : "unHowerTree",
			"click .askToSwapGen" : "askToSwapGen",
			"click .editProfileBtn" : "editProfile",
			"click .askToSwapSpec" : "askToSwapSpec",
			"click .loveProfileTree" : "loveThing",
			"click .thingRmBtn" : "removeThingClicked",

			// Accept, reject and finish swaps
			'click .accSwapBtnProfile' : 'acceptSwap',
			'click #sndRplyBtnProfile' : 'sendAcceptSwap',
			'click .rejSwapBtnProfile' : 'rejectSwap',
			'click .finishSwapProfile' : 'finishSwap'
		},

		acceptSwap : function(event) {
			var id = event.currentTarget.id.split("_")[1];
			this.swapId = event.currentTarget.id.split("_")[2];
			console.log("ACC SWAP in profile id: " + this.swapId);
			this.swapReplyId = id;
			$('#sendSwapReplyProfile').modal('show');	
		},

		sendAcceptSwap : function (){
			console.log("send accept swap profile " + this.swapId);
			var that = this;
			
			new app.SwapReply().save({
				fromId : app.Registry.getUserId(),
				toId : this.swapReplyId,
				answ : $('#accSwapTextProfile').val(),
			}, { success : function(res){
				console.log("Reply was sent! will destroy request");

				new app.SwapRequest({id:that.swapId}).destroy({
					success : function(model, response) {
						console.log("delete success " + response);
					}
				});
			
			app.TodoRouter.navigate("",{trigger: true, replace: true});
			}});
		},

		rejectSwap : function(event) {
			var id = event.currentTarget.id.split("_")[1];
			var swapId = event.currentTarget.id.split("_")[2];
			console.log("REJ SWAP profile: " + i);
			new app.SwapReply().save({
				fromId : app.Registry.getUserId(),
				toId : id,
				answ : "No"
			}, { success : function(res){
				console.log("Reply was sent! Will destroy request");

				new app.SwapRequest({id:swapId}).destroy({
					success : function(model, response) {
						console.log("delete success " + response);
						app.TodoRouter.navigate("",{trigger: true, replace: true});
					}
				});

			}});
		},

		finishSwap : function(event) {
			var id = event.currentTarget.id.split("_")[1];
			console.log("finish swap, will delete " + id);
			var that = this;

			new app.SwapReply({id : id}).destroy(
				{success: function(model,response){
					console.log("deleted ");
			}});
			app.TodoRouter.navigate("",{trigger: true, replace: true});

		},

		removeThingClicked : function(event) {
			event.preventDefault();
			var thingId = event.currentTarget.id.split("_")[1];
			var thing = new app.Thing({id : thingId});
			thing.destroy();

			var that = this;
			this.preRender().done(function() {
				that.render();
			});

		},	

		editProfile : function() {
			app.TodoRouter.navigate("editProfile/" + this.model.get('_id'),
				{trigger: true, replace: true});	
		},

		// TODO: refactor this into the function below this one
		askToSwapGen : function(event) {
			event.preventDefault();
			new app.SwapRequest().save({
				from : app.Registry.getUserId(),
				to : this.model.get('_id'),
				thing : 'General'
			}, { success : function(res){
				$('#swapReqSentModal').modal('show');	
			}});
		},

		askToSwapSpec : function(event) {
			event.preventDefault();
			new app.SwapRequest().save(
			{
				from : app.Registry.getUserId(),
				to : this.model.get('_id'),
				thing : event.currentTarget.id.split("_")[1]
			}, 
			{ success : function(){
				$('#swapReqSentModal').modal('show');	
			}
		});
		},

		renderEnvBlog : function() {
			if ( this.loveEnvBlog.get('_id') ) 
				this.loveEnvBlog.id = this.loveEnvBlog.get('_id');

			this.render();
		},

		preRender : function() {
			var dfr = $.Deferred();
			this.isUser = app.Registry.isSameAsUser(this.options.modelId);
			var that = this;
			this.fetchUserThings().done(function() {
				if ( that.isUser ) {
					that.getSwapRequestsAndReplies(that.options.modelId)
					.done(dfr.resolve);
				} else {
					dfr.resolve();
				}
			});
			return dfr.promise();
		},

		render : function() {
			this.$el.html(this.template({
				user: this.model.attributes,
				things : this.collection.models,
				loveEnvBlogPosts : this.loveEnvBlog.get('posts'),
				swapRequests: this.swapRequests,
				swapReplies : this.swapReplies,
				isUser : this.isUser,
				match: this.match
			}));			

			return this;
		},

		postRender : function() {
			if ( this.options.newlyRegistered ) {
				console.log("newly registered");
				$('#editProfileNowModal').modal('show');
			}
		},

		fetchUserThings : function() {
			var that = this;
			var dfr = $.Deferred();
			this.model.fetch({
				success: function(res) {
					that.fetchThings().done(function() {
						dfr.resolve();
					});
				}
			});
			return dfr.promise();
		},

		fetchThings : function() {
			this.collection = new app.ThingCollection();
			this.collection.url = "/api/things/user/" + this.model.get('_id');
			var dfr = $.Deferred();
			var that = this;
			this.collection.fetch({
				success: function(res) {
					var aList = app.Registry.getUsersThings();
					var bList = res.models;
					if( !app.Registry.isSameAsUser(that.model.get('_id')) )
						that.match = app.CalculateMatch.calculateMatchByBBThingsList(aList, bList);

					
					that.listenTo(that.collection,
					 'change', $.proxy(that.render, that));
					that.renderLoveEnvBlog()
					.done(function() {
							dfr.resolve();
					});
				}
			});
			return dfr.promise();
		},

		getSwapRequestsAndReplies : function(userId) {
			var that = this;
			var dfr = $.Deferred();
			$.get('/api/swapRequests/' + userId)	 		
	 		.always( function(res) {
			 	if ( res && res.length > 0 ){
			 		that.swapRequests = res;
			 	}

	 			// get replies
	 			$.get('/api/swapReplies/' + userId)
	 			.always( function(res) {
	 				if ( res && res.length > 0 ){
						that.swapReplies = res;
					}
					dfr.resolve();
	 			});
	 		});
	 		return dfr.promise();
	 	},		


		loveThing : function(event) {
			event.preventDefault();
			var thingIndex = event.currentTarget.id.split("_")[1];
			var thing = this.collection.models[thingIndex];
			thing.addSomeLove();
		},

		renderLoveEnvBlog : function(){
			var dfr = $.Deferred();
			var that = this;
			this.loveEnvBlog.fetch({
				success : function(c, r, o){
					dfr.resolve();
				},error : function(c,x,o) {
					dfr.resolve();
				}
			});
			return dfr.promise();

		},

		howerTree : function(event) {
			var i = event.currentTarget.id.split("_")[1];
			$('#thingPrBtn_' + i).show();
			$('#thingPrBtn_' + i).css('opacity:0.6;filter:alpha(opacity=60)');
		}, 

		unHowerTree : function(event) {

			var i = event.currentTarget.id.split("_")[1];
			$('#thingPrBtn_' + i).hide();
			$('#thingPrBtn_' + i).css('opacity:1;filter:alpha(opacity=100)');
		},

		
		addBlogPost : function(event) {
			event.preventDefault();
			if (this.model.get('_id') != app.Registry.getUserId()) return false;

			var file = $('#postImage')[0].files[0];
			var posts = this.loveEnvBlog.get('posts');
			posts.push({
				imgPath : file.name,
				text : $("#newPostText").val(),
				likes : new Array(),
				created : new Date()
			});
			this.loveEnvBlog.set({posts : posts});

			console.log("Is new = " + this.loveEnvBlog.isNew());
			var that = this;
			this.loveEnvBlog.save({
				success: that.uploadFile( {
					file : file,
					handler : that.uploadSuccess
				})				
			});
		},

		uploadSuccess : function() {
			console.log("saved : " + JSON.stringify(this.loveEnvBlog));
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
					console.log('error occured: ' + res);
				},
				//Options to tell JQuery not to process data or worry about content-type
				cache : false,
				contentType : false,
				processData : false
			});
		},

		bindListeners : function() {
			//this.on("click" #editProfileBtn" : "editProfile",")
		},

		cleanUp : function() {
			this.unbind();
			$('#mainBannerId').empty();
			this.$el.empty();
		}	
	});
});