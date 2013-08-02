var mongoose	= mongoose || require('mongoose');
var Schema		= Schema || mongoose.Schema;
var $	        = require('jquery');
var _ 			= require('underscore')._;

var Thing = mongoose.model('things', new mongoose.Schema({
	title: String,
	category: String,
	subCategory: String,
	tags : Array,
	description : String,
	created : Date,
	imgPath : String,
	placementCountry : String,
	placementCity : String,
	giveAway : Boolean,
	owner : { type: Schema.Types.ObjectId, ref: 'users' },
	loves : Array
}));


var Category = mongoose.model('categories', new mongoose.Schema({
	url: String,
	title: String,
	img: String,
	subCategory: Array
}));

exports.createThing = function(req, res){
	var thing = new Thing({
		title: req.body.title,
		category: req.body.category,
		subCategory : req.body.subCategory,
		tags : req.body.tags,
		description : req.body.description,
		created : req.body.created,
		imgPath : req.body.imgPath,
		giveAway : req.body.giveAway,
		placementCountry : req.body.placementCountry,
		placementCity : req.body.placementCity,
		owner : req.body.owner
	});

	thing.save(function(err) {
		if (!err) {
			return console.log("created"); 
		}    
		return res.send(thing);
	});

	return res.send(thing);
}

exports.getThingsForUserWithId = function(req, res){
	return Thing.find({owner : req.params.id})
	.exec(function(err, things) {
		console.log("err: " + JSON.stringify(err));
		console.log("users things: " + JSON.stringify(things));
		if (!err) {
			return res.send(things);
		}
	});
}

exports.searchThings = function(req,res) {
	var query = req.params.query;
	var page = req.query.page;
	var resSize = req.query.resSize;
	var category = req.query.searchCategory;
	var country = req.query.country;
	var city = req.query.city;


	var params = {title : query};
	if ( category && category != 'All Categories')
		params.category = category;
	if ( country ) 
		params.placementCountry = country; 
	if ( city ) 
		params.placementCity = city; 

	return Thing.find(params)
	.limit(resSize)
	.skip((page-1)*resSize)
	.exec(function(err, things) {
		if ( !err) {
			return res.send(things);
		} else {
			return res.send(null);
		}

	})

}

exports.updateThingAddLove =  function(req, res){

	var thingId = req.params.thingId;
	var userId = req.params.userId;


	return Thing.findById(thingId,
		function(err, thing){
			if ( !err ) {

				if ( thing.loves ) {
					if (_.contains(thing.loves, userId)) {
						console.log("You already love this");
						return res.send(thing);
					}
				}else{
					thing.loves = new Array();
				}          

				console.log("you dont love this");
				var loves = thing.loves;
				loves.push(userId);

				Thing.findByIdAndUpdate(thingId, {loves : loves} , function(err, doc){
					console.log("Updated: " + JSON.stringify(doc));
					res.send(doc);
				});
			}

		});
}

/*
* /api/things/cat/subcat/?page=x&resSize=x
*
* Sub-Category is the name
*/
exports.getThingsBySubCategory = function(req,res) {
	var cat = req.params.cat;
	var subCat = req.params.subCat;
	var page = req.query.page;
	var resSize = req.query.resSize;

	var query = { 'category': cat };
	if ( subCat != 'All Categories')
		query.subCategory = subCat;

	console.log("/api/things/:cat/:subCat reqed! " + cat + ", " + subCat);
	return Thing.find(query)
	.limit(resSize)
	.skip((page-1)*resSize)
	.exec(
		function (err, things) {

			console.log("err: " + JSON.stringify(err));
			console.log("user: " + JSON.stringify(things));

			if (!err)
				return res.send(things);
		});
}

exports.getThingById = function(req, res){
	return Thing.findById(req.params.id)
	.populate('owner')
	.select('-owner.password')
	.exec(function(err, things) {
		console.log("err: " + JSON.stringify(err));
		console.log("user: " + JSON.stringify(things));
		if (!err) {
			return res.send(things);
		}
	});
}

exports.getCategories = function(req, res){
	return Category.find(function(err, categories) {
		return res.send(categories);
	});
}

exports.deleteThingWithId = function(req, res) {
	console.log( 'Deleting thing with id: ' + req.params.id );
    return Thing.findById( req.params.id, function( err, doc ) {
        return doc.remove( function( err ) {
            if( !err ) {
                console.log( 'deleteThingWithId() removed!' );
                return res.send(doc);
            } else {
                console.log( 'deleteThingWithId() : ' + err );
                return res.send(null);
            }
        });
    });
}
