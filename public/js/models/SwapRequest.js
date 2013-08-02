var app = app || {};

(function() {
	'use strict';

	app.SwapRequest = Backbone.Model.extend({

		//url : '/api/things',
		urlRoot: '/api/swapRequests',

		defaults: {
			created : new Date()
		},
	});

}());