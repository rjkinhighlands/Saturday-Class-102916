// Dependencies //

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App //
var app = express();
var PORT = process.env.PORT || 3000;

// DATA PARSING //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// CUSTOMERS DATA //

var customers = [{
	customerName: "",
	name: "",
	phoneNumber: "",
	customerEmail: "",
	customerID: ""
}, 
}];

// Routes //

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/add', function (req, res) {
	res.sendFile(path.join(__dirname, 'add.html'));
});

app.get('/all', function (req, res) {
	res.sendFile(path.join(__dirname, 'all.html'));
});

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:characters?', function (req, res) {
	var chosen = req.params.characters;

	if (chosen) {
		console.log(chosen);

		for (var i = 0; i < characters.length; i++) {
			if (chosen === characters[i].routeName) {
				res.json(characters[i]);
				return;
			}
		}

		res.json(false);
	} else {
		res.json(characters);
	}
});

// Create New Characters - takes in JSON input
app.post('/api/new', function (req, res) {
	var newcharacter = req.body;
	newcharacter.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase();

	console.log(newcharacter);

	characters.push(newcharacter);

	res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});