var app = app || {};

$(function( $ ) {
	'use strict';

	// Just holds events that belongs to the navigation!
	app.FrontPageView = Backbone.View.extend({

		//el : "#mainContentId",

		events : {
			//'submit #addForm' : 'saveThing',
			//'click .registerButton' : 'register',
			//'click .signinButton' : 'authenticate',
		},

		template : _.template($("#frontPage-template").html()),
		
		initialize : function() {
			this.categories = app.Registry.getObject('categories');
		},

		render : function() {
			this.$el.html(this.template({
				categories : this.categories,
				subCategories : this.categories[0].subCategory || "-"
			}));	
			return this;	
		},
	});
});
