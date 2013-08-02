var app = app || {};

(function() {
	'use strict';

	var ThingCategoryCollection = Backbone.Collection.extend({

		model: app.ThingCategory,

		// Todos are sorted by their original insertion order.
		//comparator: function( todo ) {
		//	return todo.get('order');
		//}
	});

	app.ThingCategories = ThingCategoryCollection;
}());