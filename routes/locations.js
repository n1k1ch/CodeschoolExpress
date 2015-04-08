var express = require('express');
var router = express.Router();

var locations = {
	'Fixed': 'First floor', 'Movable': 'Elevator', 'Rotating': 'Penthouse'
};

router.route('/:name')
	.all(function(request, response, next){
		var name = request.params.name;
		var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
		request.blockName = block;
		next();
	})
	.get(function(request, response){
		var location = locations[request.blockName];

		if(!location) {
			response.status(404)
			.json('No location found for ' + request.params.name);
		} else {
			response.json(location);
		}
	});

module.exports = router;