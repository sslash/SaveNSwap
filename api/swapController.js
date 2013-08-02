var mongoose	= mongoose || require('mongoose');
var Schema		= Schema || mongoose.Schema;
var $         = require('jquery');

var SwapRequest = mongoose.model('swapRequests', new mongoose.Schema({
	from : { type: Schema.Types.ObjectId, ref: 'users' },
	to : { type: Schema.Types.ObjectId, ref: 'users' },
	thing : { type: Schema.Types.Mixed }
}));

var SwapReply = mongoose.model('swapReplies', new mongoose.Schema({
	fromId : { type: Schema.Types.ObjectId, ref: 'users' },
	toId : { type: Schema.Types.ObjectId, ref: 'users' },
	answer : String,
	thing : { type: Schema.Types.ObjectId, ref: 'things' },
}));


exports.createSwapRequest = function(req, res){
	var swapRequest = new SwapRequest({
		from : req.body.from,
		to : req.body.to,
		thing : req.body.thing
	});

	return swapRequest.save(function(err, doc) {
		if (!err) {
			console.log("created swap request"); 
			return res.send(doc);
		} else {
			console.log("swap request failed to save"); 
			return res.send(null);
		}
	});
}

exports.createSwapReply = function(req, res){
	var swapResponse = new SwapReply({
		fromId : req.body.fromId,
		toId : req.body.toId,
		answer : req.body.answ,
		thing : req.body.thing || null
	});

	return swapResponse.save(function(err, doc) {
		if (!err) {
			console.log("created swap response"); 
			return res.send(doc);
		} else {
			console.log("swap response failed"); 
			return res.send(null);
		}    	
	});
}

exports.getSwapRequestsForUserWithId = function(req, res) {
	return SwapRequest.find({to : req.params.toId})
	.populate('from')
	.exec(function(err,swapRequest) {
		if ( !err) {
			return res.send(swapRequest);
		}else{
			return res.send(null);
		}
	});
}

exports.getSwapRepliesForUserWithId =  function(req, res) {
	return SwapReply.find({toId : req.params.toId})
	.populate('fromId')
	.exec(function(err,swapRequest) {
		if ( !err) {
			return res.send(swapRequest);
		}else{
			return res.send(null);
		}
	});
}

exports.deleteSwapReplyWithId = function(req, res){
	return SwapReply.findById(req.params.id, function(err, reply) {
		return reply.remove(function(err) {
			if (!err) {
				console.log("removed swapreply ok");
				return res.send('delete ok');
			}else {
				console.log("removed swapreply fail");
				return res.send('delete fail!');
			}
		});
	});
}

exports.deleteSwapRequestWithId = function(req, res){
	return SwapRequest.findById(req.params.id, function(err, swapRequest) {
		return swapRequest.remove(function(err) {
			if (!err) {
				console.log("removed swapRequest ok");
				return res.send('delete ok');
			}else {
				console.log("removed swapRequest fail");
				return res.send('delete fail!');
			}
		});
	});
}




