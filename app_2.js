var express = require('express');
var app = express();


var logger = require('./logger');
app.use(logger);

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/index2.html');
});

app.use(express.static('public'));

var blocks = require('./routes/blocks');
var locations = require('./routes/locations');

app.use('/blocks', blocks);
app.use('/locations', locations);

var port = 3000;
app.listen(port, function(){
	console.log('Listening on ' + port)
});