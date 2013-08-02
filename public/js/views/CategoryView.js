var app = app || {};

$(function( $ ) {
	'use strict';

	// TODO: Events are added each time the page renders
	// Might consider unbind when the page is to render again
	app.CategoryView = Backbone.View.extend({

		//el: '#mainContentId',

		template: _.template( $('#subCategory-template').html()),

		thingsTemplate: _.template( $('#things-template').html()),

		initialize : function() {

			this.category = app.Registry.getCategoryFor(this.options.category);
			//this.render();
			if ( this.options.subCategory )
				this.subCategory = this.options.subCategory
			else
				this.subCategory = 'All Categories';

			this.collection = new app.ThingCollection(null, {
				category: this.category.title,
				subCategory : this.subCategory,
				page : 1,
				resSize : 20
			});

			var that = this;
			this.collection.fetch({
				success: function(res) {
					that.renderCollection(res);
					that.listenTo(that.collection,
					 'change', $.proxy(that.renderCollection, that));
				}
			});
		},
		

		events : {
			"click .subCategoryClk" : "changeCategory",	
		},

		loveThing : function(event) {
			event.preventDefault();
			var thingIndex = event.currentTarget.id.split("_")[1];
			var thing = this.collection.models[thingIndex];
			thing.addSomeLove();
		},
		
		howerTree : function(event) {
			var i = event.currentTarget.id.split("_")[1];
			$('#thingBtn_' + i).show();
			$('#thingImg_' + i).css('opacity:0.6;filter:alpha(opacity=60)');
		}, 

		unHowerTree : function(event) {

			var i = event.currentTarget.id.split("_")[1];
			$('#thingBtn_' + i).hide();
			$('#thingImg_' + i).css('opacity:1;filter:alpha(opacity=100)');
		},

		changeCategory : function(event) {
			event.preventDefault();
			this.subCategory = event.currentTarget.id.split("_")[1];
			this.collection = new app.ThingCollection(null, {
				category: this.category.title,
				subCategory : this.subCategory,
				page : 1,
				resSize : 20
			});
			var that = this;
			this.collection.fetch({
				success: function(res) {
					that.renderCollection();
				}
			});
		},

		render : function() {
			this.renderSubCategories();
			return this;
		},

		renderSubCategories : function() {
			this.$el.html(this.template({
					categories : this.category.subCategory
				}));
		},

		renderCollection : function() {
			// Set subtitle to be title of general category, if no
			// sub categories are chosen
			var title = this.subCategory == 'All Categories' ? 
				this.category.title : this.subCategory;

			$('#thingsId').html(this.thingsTemplate({
				things : this.collection.models,
				category: title
			}));

			$('.artifact-imgsap').on("mouseenter", this.howerTree);
			$('.artifact-imgsap').on("mouseleave", this.unHowerTree);
			$('.artifact-imgsap').on("click", this.showThing);
			$('.loveTree').on("click", $.proxy(this.loveThing, this));
		},

		showThing : function(event) {
			event.preventDefault();
			if ( app.Registry.isLoggedIn()){
				var thingId = event.currentTarget.id.split("_")[2];
				new app.ThingView({thingId : thingId});
			} else {
				$('#mustBeLoggedInModal').modal('show');
			}
		},

		// TODO: implement this as a mixin!
		beforeClose : function() {
			$('#things-inner').remove();
		}
	});
});