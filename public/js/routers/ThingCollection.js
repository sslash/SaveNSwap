var app = app || {};

(function() {
	'use strict';

	var ThingCollection = Backbone.Collection.extend({

		model: app.Thing,

		// Todos are sorted by their original insertion order.
		//comparator: function( todo ) {
		//	return todo.get('order');
		//}
	});

	// Create our global collection of **Todos**.
	app.Things = new ThingCollection();
}());