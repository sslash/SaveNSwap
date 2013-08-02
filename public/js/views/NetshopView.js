var app = app || {};
var shoppingCart = app.shoppingCart || new app.ShoppingCart();

$(function( $ ) {
	'user strict';

	app.NetshopView = Backbone.View.extend({

		//el : $('#mainBannerId'),

		initialize : function() {
			this.template = _.template(app.templateFetcher.templates.netshopTmpl);
		},

		render : function() {
			this.$el.html(
				this.template({
					sc : shoppingCart.toJSON()
				})
			);	
			return this;	
		},

		bindListeners : function() {
			this.$('.carousel').carousel();
		},

		events : {},
	});
});