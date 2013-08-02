var mongoose	= mongoose || require('mongoose');
var Schema		= Schema || mongoose.Schema;
var $	        = require('jquery');
var _ 			= require('underscore')._;

exports.NSItem = mongoose.model('NSItems', new mongoose.Schema({
	title: String,
	description : String,
	category: String,
	price : Number,
	imgPath : String
}));


/*
* /api/things/cat/subcat/?page=x&resSize=x
*
* Sub-Category is the name
*/
exports.getNSItemsByCategory = function(req,res) {
	var cat = req.params.cat;
	var page = req.query.page;
	var resSize = req.query.resSize;

	var query = { 'category': cat };
	console.log("/api/NSItems/:cat reqed! " + cat );
	return exports.NSItem.find(query)
	.limit(resSize)
	.skip((page-1)*resSize)
	.exec(function (err, items) {
		if (!err)
			return res.send(items);
	});
}

exports.getAllNSItems = function(req,res){
	return exports.NSItem.find()
	.exec(function (err, items) {
		if (!err)
			return res.send(items);
	});
}

exports.getById = function(id) {
	var dfr = $.Deferred();
	exports.NSItem.findById(id)
	.exec(function(err, thing) {
		if (!err) {
			dfr.resolve(thing);
		} else {
			dfr.reject();
		}
	});
	return dfr.promise();
}


exports.shopItem = function(req,res) {
	if(!req.session['shoppingCart'])
		req.session['shoppingCart'] = [];

	currId = req.params.id;
	exports.getById(currId)
	.done(function(thing){

		if ( thing ){

			var found = false;
			_.each(req.session['shoppingCart'], function(cart){
				if ( cart.obj._id === thing.id ){
					cart.quantity ++;
					found = true;
				}
			});

			if ( !found) {
				cartItem = {
					obj: thing,
					quantity : 1
				};
				req.session['shoppingCart'].push(cartItem);
			}
			//console.log("og hepp");
			return res.send(req.session['shoppingCart']);
		}else{
			return res.send(null);
		}

	});
}

exports.deleteFromSessionById = function(req, res) {
	var cart = req.session['shoppingCart'];
	var delIndex = -1;
	var id = req.params.id;
	if ( cart && id) {
		for ( var i = 0; i < cart.length; i ++) {
			if ( cart[i].obj._id === id ){
				delIndex = i;
				break;
			}
		}

		console.log("i: " + delIndex);
		if ( delIndex >= 0 ){
			cart.splice(delIndex,1);
		}

		return res.send(cart);
	}else{
		return res.send(null);
	}
}
