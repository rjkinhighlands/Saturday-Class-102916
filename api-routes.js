var tableData 		= require('../data/table-data.js');
var waitListData 	= require('../data/waitinglist-data.js');

// ROUTING //
module.exports = function (app) {
	/
	app.get('/api/tables', function (req, res) {
		res.json(tableData);
	});

	app.get('/api/waitlist', function (req, res) {
		res.json(waitListData);
	});

// API POST REQUEST //
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

	app.post('/api/tables', function (req, res) {
		// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
		// It will do this by sending out the value "true" have a table
		if (tableData.length < 5) {
			tableData.push(req.body);
			res.json(true); // KEY LINE
		} else { // Or false if they don't have a table
			waitListData.push(req.body);
			res.json(false); // KEY LINE
		}
	});

	// ---------------------------------------------------------------------------
	// I added this below code so you could clear out the table while working with the functionality.
	// Don't worry about it!

	app.post('/api/clear', function () {
		// Empty out the arrays of data
		tableData = [];
		waitListData = [];

		console.log(tableData);
	});
};