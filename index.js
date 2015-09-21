var express = require('express');
var app = express();
var port = (process.env.PORT || '3000')

app.get('/', function (req,res) {
	res.send('Hello world')
});

app.listen(port);

console.log('Server is listening on port 3000')
