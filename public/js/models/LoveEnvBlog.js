var app = app || {};

(function() {
	'use strict';

	app.LoveEnvBlog = Backbone.Model.extend({

		urlRoot: '/api/loveEnvBlog',

		defaults: {
			posts: new Array()
		},

		initialize : function() {
			this.urlRoot += "/" + this.get("owner");
			
		}
	});

}());