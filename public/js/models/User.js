var app = app || {};

(function() {
	'use strict';

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.User = Backbone.Model.extend({
		
		urlRoot : '/api/users',

		defaults: {
			username: '',
			email: '',
			interests: new Array()			
		},


	});
}());