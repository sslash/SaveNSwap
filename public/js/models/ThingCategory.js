var app = app || {};

(function() {
	'use strict';

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.ThingCategory = Backbone.Model.extend({
		defaults: {
			title: '',
			url: '',
			img: ''
		}
	});
}());