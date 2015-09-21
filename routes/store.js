//var NODE_ENV=development(local) | production (azure default)
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('store', { title: 'Express under store ', messsageURL: process.env.MESSAGE_URL });
});

router.route('/message')
		.post(function(req,res,next) {
			console.log('Receiving message ' + req.body.message);
			res.send('Message was ' + req.body.message);
		});

module.exports = router;
