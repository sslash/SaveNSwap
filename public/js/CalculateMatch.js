var app = app || {};


// Make sure jquery har arrived
$(function($) {
	'use strict'

	app.CalculateMatch = (function(){


		var calculateMatchByThingsList = function(a,b) {
			return doCalculate(a,b, false)
		},

		// Same as above,only b is a backbone colelction model
		calculateMatchByBBThingsList = function(a,b) {
			return doCalculate(a,b, true);
		},

		doCalculate = function(a,b, isBackboneModel) {
			console.log("sap");

			if (a && b){
			// One of them doesn't have any things!
			if ( a.length == 0 || b.length == 0 ) return 0;
			var aCats, bCats;
			aCats = _.map(a, function(thing) {
				return thing.category;
			});

			if ( isBackboneModel ) {	
				bCats = _.map(b, function(thing) {
					return thing.get('category');
				});	
			} else {
				bCats = _.map(b, function(thing) {
					return thing.category;
				});
			}

			var match =  ((_.intersection(aCats, bCats).length/aCats.length)*100);
			return match;
		} return 0;
	}

	return {
		calculateMatchByThingsList : calculateMatchByThingsList,
		calculateMatchByBBThingsList : calculateMatchByBBThingsList
	}

})();
});