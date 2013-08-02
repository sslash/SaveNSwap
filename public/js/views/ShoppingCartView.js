var app = app || {};
var shoppingCart = app.shoppingCart || new app.ShoppingCart();

$(function( $ ) {
	'user strict';

	app.ShoppingCartView = Backbone.View.extend({

		//el : $('#mainBannerId'),
		//collection : app.NSItemCollection,

		events : {
			'click .btn-danger' : 'delBtnClicked',
			'click .buyBtn' : 'buyBtnClicked',
			'click .update' : 'updateBtnClicked'
		},

		delBtnClicked : function(e) {
			var id = e.currentTarget.id.split('_')[1];
			shoppingCart.deleteItem(id);

		},

		updateBtnClicked : function() {
			var items = shoppingCart.get('items');
			_.each(items, function(i, index){
				var css_class = '#quantity_' + index;
				var val = $(css_class).val();
				console.log("val: " + val);
				items[index].quantity = val;
			});
			this.render();
		},

		buyBtnClicked : function() {

		},	

		initialize : function() {
			this.template = 
			_.template(app.templateFetcher.templates.ns_shoppingCart);
			this.listenTo(shoppingCart, 'action:newItem', this.render);
		},

		render : function() {
			var sum = _.reduce(shoppingCart.get('items'), 
				function(memo, num) {
					return memo + (num.obj.price * num.quantity) ;
			}, 0);

			console.log("SUM : " + sum);

			this.$el.html(this.template({
				sc : shoppingCart.toJSON(),
				sum : sum || 0
			}));
			return this;	
		},
	});
});