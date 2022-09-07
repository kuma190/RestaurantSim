const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'csce310ressim.cnb0q1gcfvpt.us-east-1.rds.amazonaws.com',
	user     : 'admin',
	password : 'readysetgo',
	database : 'main'
});

// initialize express
const app = express();

// associate the modules being used with express
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// // http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/register.html'));
});

// adding a new route that will register the user
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let firstname = request.body.firstname;
	let lastname = request.body.lastname;
    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;
    let address = request.body.address;
    let city = request.body.city;
    let state = request.body.state;
    let zip = request.body.zip;
    let birthdate = request.body.birthdate;
    let is_admin = request.body.is_admin;
	// Ensure the input fields exists and are not empty
	if (firstname && lastname && username && password && email && address && city && state && zip && birthdate) {
        if (is_admin == undefined) {
            is_admin = 0;
        }
        else {
            is_admin = 1;
        }
        var query = "INSERT INTO `accounts` (username, password, email, address, firstname, lastname, city, state, zip, birthdate, is_admin) VALUES ('" + username + "', '" + password + "', '" + email + "', '" + address + "', '" + firstname + "', '" + lastname + "', '" + city + "','" + state + "', '" + zip + "', '" + birthdate + "'," + is_admin + ");";
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(query, function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) {
                throw error;
            }
			else {
				response.send('You are now registered ' + username + '.');
			}			
			response.end();
		});
	} else {
		response.send('Please enter all fields.');
		response.end();
	}
});

// home route that will output the user's username
// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('You are now registered and logged in ' + request.session.username + '.');
	} else {
		// Not logged in
		response.send('Please register/login to view this page.');
	}
	response.end();
});

app.listen(3000);