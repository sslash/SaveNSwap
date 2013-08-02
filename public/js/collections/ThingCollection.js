var app = app || {};

(function() {
	'use strict';

	var ThingCollection = Backbone.Collection.extend({

		model: app.Thing,

		url: function(){ 
			var url = "/api/things/";
			if ( this.urlParams.category && this.urlParams.subCategory) {
				url += this.urlParams.category + 
					'/' + this.urlParams.subCategory;
			} else if ( this.urlParams.query) {
				// TODO: change to use ?q=
				url += 'search/' + this.urlParams.query
			}

			url += '?' + 'page=' + 
					this.urlParams.page + "&resSize=" + this.urlParams.resSize;

			if ( this.urlParams.searchCategory) {
				url += "&searchCategory=" + this.urlParams.searchCategory;
			}
			if ( this.urlParams.country) {
				url += "&country=" + this.urlParams.country;
			}
			if ( this.urlParams.city) {
				url += "&city=" + this.urlParams.city;
			}

			return url;
		},

		initialize : function(model, options) {
			this.urlParams = {};
			if ( options ) {
				this.urlParams['category'] = options.category;
				this.urlParams['subCategory'] = options.subCategory;
				this.urlParams['query'] = options.query;
				this.urlParams['page'] = options.page;
				this.urlParams['resSize']= options.resSize;
				this.urlParams['country']= options.country;
				this.urlParams['city']= options.city;
			}			
		}
	});

	// Create our global collection of **Todos**.
	app.ThingCollection = ThingCollection;
}());