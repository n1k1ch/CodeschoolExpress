var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var blocks = {
	'Fixed':'Fastened securely in position',
	'Movable':'Capable of being moved',
	'Rotating':'Moving in a circle around its center'
};

var locations = {
	'Fixed': 'First floor', 'Movable': 'Elevator', 'Rotating': 'Penthouse'
};

var logger = require('./logger');
app.use(logger);

app.param('name', function(request, response, next){
	var name = request.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
	request.blockName = block;
	next();
});

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/index2.html');
});

app.route('/blocks')
	.get(function(request, response) {
		response.json(Object.keys(blocks));
	})
	.post(parseUrlEncoded, function(request, response){
		var newBlock = request.body;
		blocks[newBlock.name] = newBlock.description;
		console.log(blocks);
		response.status(201).json(newBlock.name);
	});

app.route('/blocks/:name')
	.get(function(request, response){
		var description = blocks[request.blockName];

		if(!description) {
			response.status(404)
			.json('No description found for ' + request.params.name);
		} else {
			response.json(description);
		}
	})
	.delete(function(request, response){
		console.log(request.blockName);
		delete blocks[request.blockName];
		console.log(blocks);
		response.sendStatus(200);
	});

app.route('/locations/:name')
	.get(function(request, response){
		var location = locations[request.blockName];

		if(!location) {
			response.status(404)
			.json('No location found for ' + request.params.name);
		} else {
			response.json(location);
		}
	});


app.use(express.static('public'));

var port = 3000;
app.listen(port, function(){
	console.log('Listening on ' + port)
});