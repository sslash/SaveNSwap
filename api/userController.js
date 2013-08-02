var mongoose	= mongoose || require('mongoose');
var Schema		= Schema || mongoose.Schema;
var $         = require('jquery');

var User = mongoose.model('users', new mongoose.Schema({
	username: String,
	email: String,
	country: String,
	city : String,
	zipCode: String,
	password: String,
	interests: Array,
	created : Date,
	imgPath : String,
	about : String
}));

var LoveEnvBlog = mongoose.model('loveEnvBlog', new mongoose.Schema({
	owner : { type: Schema.Types.ObjectId, ref: 'users' },
	posts : Array
}));


exports.getUsers = function(req,res) {
	return User.find()
	.select('-password')
	.exec(function(err, doc) {
		if (!err) {
			return res.send(doc);
		}
	});
}

exports.createUser = function(req, res){
	var user;
	user = new User({
		username: req.body.username,
		country: req.body.country,
		zipCode: req.body.zipCode,
		created: req.body.created,
		email: req.body.email,
		password : req.body.password,
		interests : req.body.interests,
		imgPath : req.body.imgPath,
		about : req.body.about
	});

	return user.save(function(err,doc) {
		if (!err) {
			console.log("created", JSON.stringify(doc)); 
			return res.send(doc);
		} else {
			return res.send(null);
		}		
	});	
}

exports.getUserById = function(req, res){
	return User.findById(req.params.id)
	.select('-password')
	.exec(function(err, user) {
		if (!err) {
			return res.send(user);
		}
	});
}

exports.updateUser = function(req, res){
	User.update({'_id' : req.params.id},req.body, function(err, doc){
		if ( !err){
			console.log("updated user! " + doc);
		} 
		return User.findById(req.params.id)
		.select('-password')
		.exec(function(err, user) {
			if (!err) {
				console.log("sap: " + user);
				return res.send(user);
			}
		});
	});
}


exports.getLEBbyOwnerId = function(req, res){
	return LoveEnvBlog.findOne({owner : req.params.ownerId})
	.exec(function(err, blogs) {
		
		if (!err) {
			console.log("blogs: " + JSON.stringify(blogs));
			return res.send(blogs);
		}else{
			console.log("err: " + JSON.stringify(err));
			return res.send(null);
		}
	});
}

exports.updateLEB = function(req, res){
	return LoveEnvBlog.findById(req.params.blogId, function(err, leb) {
		leb.posts = req.body.posts;
		return leb.save(function(err) {
			if (!err) {
				console.log("updated");
			}
			return res.send(leb);
		});
	});
}

exports.addLEB = function(req, res){
	var leb = new LoveEnvBlog({
		owner : req.body.owner,
		posts : req.body.posts
	});

	leb.save(function(err) {
		if (!err) {
			return console.log("created leb"); 
		}    
		return res.send(leb);
	});

	return res.send(leb);
}

exports.authenticateUser = function(req, res) {
	console.log("/authenticate requested! " + JSON.stringify(req.body));
	var mail = req.body.email;
	var pass = req.body.password;

	return User.findOne({ 'email': mail, 'password':pass }, function (err, user) {

		console.log("err: " + JSON.stringify(err));
		console.log("user: " + JSON.stringify(user));

		if (!err)
			return res.send(user);
		else
			return null;
	});
}

