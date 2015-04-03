var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);


/*
app.get('/', function(request, response) {
	//1)response.send('Huilo woorld');
	//5) response.sendFile(__dirname + '/public/index.html');
});
*/

app.get('/blocks', function(request, response) {
	var blocks = ['Fixed', 'Movable', 'Rotating'];
	//2) response.send(blocks);
	//3) response.json(blocks);
	//4) response.redirect('/parts');
	//7) response.redirect(301, '/parts');
	response.send(blocks);
});


//6
app.use(express.static('public'));


/*
app.use(function(request, response, next){
	next();
});
*/

var port = 3000;
app.listen(port, function(){
	console.log('Listening on ' + port)
});