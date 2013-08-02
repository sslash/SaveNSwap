var mongoose			= mongoose || require('mongoose');
var Schema				= Schema || mongoose.Schema;
var $	        		= require('jquery');
var _ 					= require('underscore')._;
var fs                	= require('fs');
var netshopController 	= require('./netshopController');

/*
var NSItem = NSItem mongoose.model('NSItems', new mongoose.Schema({
	title: String,
	description : String,
	category: String,
	price : Number,
	imgPath : String
}));
*/
var NSItem = netshopController.NSItem;

exports.addItem = function(req, res) {
	var item = new NSItem({
		title: req.body.title,
		description: req.body.description,
		price : req.body.price,
		category : req.body.category,
	});

	item.save(function(err) {
		if (!err) {
			console.log("created"); 
			return res.send(item);
		}else{
			return res.send(null);
		}		
	});
}

exports.addFileToItem = function(req, res) {
	var id = req.params.uid;
     // get the temporary location of the file
     var tmp_path = req.files.file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/img/' + req.files.file.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
    	if (err) {
    		console.log("ERROR: " + JSON.stringify(err));
    		throw err;
    	}
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
        	if (err) throw err;
        	NSItem.findByIdAndUpdate(id, { imgPath: req.files.file.name }
        		,function(err,doc){
        			console.log("file uploaded and updated meta: " + id);
        			res.send(doc);
        		});

        });
    });
}