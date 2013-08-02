var app = app || {};
var shoppingCart = app.shoppingCart || new app.ShoppingCart();

$(function( $ ) {
	'user strict';

	app.NetshopCatView = Backbone.View.extend({

		//el : $('#mainBannerId'),
		//collection : app.NSItemCollection,

		initialize : function() {
			this.template = 
			_.template(app.templateFetcher.templates.ns_category);
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(shoppingCart, 'action:newItem', this.render);
		},

		events : {
			'click .myPop' : 'popover',
			'click .buyBtn' : 'buyClicked'
		},

		buyClicked : function(e) {
			e.preventDefault();
			var id = e.currentTarget.id.split("_")[1];
			console.log("id : " + id);
			nsItem = shoppingCart.buyItem(id);
		},

		popover : function(e){
			//e.preventDefault();
			//$(this).popover('show');
		},	

		render : function() {
			this.$el.html(this.template({
				category : this.options.catId,
				items : this.collection.toJSON(),
				sc : shoppingCart.toJSON()
			}));
			$('.myPop').popover();
			return this;	
		},
	});
});