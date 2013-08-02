var app = app || {};

(function() {
	'use strict';

	app.Thing = Backbone.Model.extend({

		//url : '/api/things',
		urlRoot: '/api/things',

		defaults: {
			title: ''
		},

		addSomeLove : function() {
			console.log("will add lover!");
			var url = this.urlRoot + '/' +this.get('_id')
				+'/user/' + app.Registry.getUserId() +
				'/addLove'
			var that = this;
			$.post(url, function(res) {
				that.set(res);
				console.log("Added some love " + JSON.stringify(that.attributes) );
			});
		}
	});

}());