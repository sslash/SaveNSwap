var app = app || {};

$(function( $ ) {
	'use strict';

	// Just holds events that belongs to the navigation!
	app.MainBannerView = Backbone.View.extend({

		el : "#mainBannerId",

		template : _.template($("#mainBanner-template").html()),
		
		initialize : function() {
			this.categories = app.Registry.getObject('categories');
			this.render();
		},

		render : function() {
			var that = this;
			require(["i18n!nls/names"], function(names) {				
				that.$el.html(that.template({
					topLabel:names.topLabel,
					categories : that.categories,
					subCategories : that.categories[0].subCategory || "-"
				}));	
			})();
		},

		events: {		
			//'change #categorySelect' : 'addSubCategory',
			'click .searchForThings' : 'searchForThingsClicked'
		},

		searchForThingsClicked : function(event) {
			event.preventDefault();
			app.TodoRouter.navigate("/search", {trigger: true});
			var query = $('#searchThings').val();
			var country = $('#searchThings_country').val();
			var city = $('#searchThings_city').val();
			var thingsView = new app.ThingsView(
				{query: query,
					country:country,
					city:city});
			app.TodoRouter.showView("#mainContentId", thingsView);
		},
		
		// THink this has been forgotten to be removed. moved to addNewTHingVIew.js
		// addSubCategory : function() {
		// 	var catname = $('#categorySelect option:selected').val();

		// 	// get all subcategires
		// 	var cat = _.findWhere(this.categories, {title : catname});

		// 	// Swap the existing list of subcategories
		// 	$('#subCategorySelect')
		// 	.empty()
		// 	.append (_.map(cat.subCategory, function(c){
		// 		return "<option>" + c.title + "</option>";
		// 	}));
		// }
	});
});
