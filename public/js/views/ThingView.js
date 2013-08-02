var app = app || {};

$(function( $ ) {
	'use strict';

	app.ThingView = Backbone.View.extend({

		el : $('#thingViewId'),

		template : _.template($('#thing-template').html()),

		/*
		* Model is app.Thing
		*/
		initialize : function () {
			this.model = new app.Thing({id : this.options.thingId});
			var that = this;
			this.model.fetch({
				success: function(m,r,o) {
					that.calculateMatchAndRender();
				}
			});
		},

		events : {
			"click .thingOwnerLink" : "gotoOwner",
			"click .gotoUserButton" : "gotoOwner"
		},

		calculateMatchAndRender : function() {			
			var othersOwnerId = this.model.get('owner')._id;
			var that = this;	
			$.get("/api/things/user/" + othersOwnerId)
	 		.done(function (res){
				var aList = app.Registry.getUsersThings();
				var bList = res;
				that.match = app.CalculateMatch.calculateMatchByThingsList(aList, bList);
				that.render();
	 		});
		},

		gotoOwner : function(event) {
			event.preventDefault();
			var id = this.model.get('owner')._id;
			$('#thingModal').modal('hide');
			this.cleanUp();
			// Trigger: call the route function
			// replace-false: create entry in browser history
			app.TodoRouter.navigate("/user/" + id, {trigger: true, replace: true});
		},


		render : function() {
			this.$el.html(this.template({
				thing: this.model.attributes,
				match : this.match
			}));
			$('#thingModal').modal('show');
		},

		cleanUp : function() {
			this.unbind();
			this.$el.empty();
		}			
	});
});