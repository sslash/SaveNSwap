var app = app || {};

(function() {
	'use strict';

	app.ShoppingCart = Backbone.Model.extend({

		//url : '/api/things',
		urlRoot: '/api/NSItems/shop/',

		defaults : {
			items : new Array()
		},

		deleteItem : function(id) {
			var that = this;
			$.post(this.url() + id + '/delete')
			.done(function(res){
				that.set({items : res});
				that.trigger('action:newItem');
			});
		},

		buyItem : function(id) {
			var that = this;
			$.post(this.url() + id)
			.done(function(res){
				that.set({items : res});
				that.trigger('action:newItem');
			});
		},

	});

}());