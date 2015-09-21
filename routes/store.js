//var NODE_ENV=development(local) | production (azure default)
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoURL = 'mongodb://geir:' + mongoPassword + '@ds040898.mongolab.com:40898/gevi'


/* GET home page. */
router.get('/', function(req, res, next) {
   console.log('Hei ' + process.env.MESSAGE_URL);
  res.render('store', { title: 'Express under store ', messageURL: process.env.MESSAGE_URL });
});

router.route('/message')
		.post(function(req,res,next) {
		var txtMessage = (req.body.message || 'empty message');
		// storing message in database
		MongoClient.connect(mongoURL, function(err, db) {
			console.log("Connected to database");
			db.collection('messages').insert({'message': txtMessage}, {w: 1}, function (err,item) {
				if (err) {
					console.log('Error storing message in database:' + err);
					db.close();
					res.status(400).send('Error, unable to store message: ' + txtMessage);
				} else {
					db.close();
					console.log('Message stored ok in database: ' + txtMessage);
					res.status(200).send('Message stored: "' + txtMessage + '"');
				}	
			});
		});
		// End storing message in database
	});
	
module.exports = router;
