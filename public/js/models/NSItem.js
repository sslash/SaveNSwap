var app = app || {};

(function() {
	'use strict';

	app.NSItem = Backbone.Model.extend({

		//url : '/api/things',
		urlRoot: '/api/NSItems',

		defaults: {
			title: ''
		},
	});

}());