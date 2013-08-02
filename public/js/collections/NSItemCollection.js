var app = app || {};

(function() {
	'use strict';

	var NSItemCollection = Backbone.Collection.extend({

		model: app.NSItem,

		url: function(){ 
			var url = "/api/NSItems/";
			if ( this.urlParams.category) {
				url += this.urlParams.category;
			}

			url += '?' + 'page=' + 
					this.urlParams.page + "&resSize=" + this.urlParams.resSize;

			return url;
		},

		initialize : function(model, options) {
			this.urlParams = {};
			if ( options ) {
				this.urlParams['category'] = options.category;
				this.urlParams['page'] = options.page;
				this.urlParams['resSize']= options.resSize;
			}			
		}
	});

	// Create our global collection.
	app.NSItemCollection = NSItemCollection;
}());