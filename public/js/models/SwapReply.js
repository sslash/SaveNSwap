var app = app || {};

(function() {
	'use strict';

	app.SwapReply = Backbone.Model.extend({

		//url : '/api/things',
		urlRoot: '/api/swapReplies',

		defaults: {
			created : new Date()
		},
	});

}());