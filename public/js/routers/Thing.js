var app = app || {};

(function() {
	'use strict';

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Thing = Backbone.Model.extend({
		defaults: {
			name: ''			
		},
	});
}());