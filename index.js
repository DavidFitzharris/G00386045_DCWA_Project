var express = require('express');
var mongoDAO = require('./mongoDAO');
// const mysql = require('promise-mysql')
var sqlDAO = require('./sqlDAO');

var app = express();
var port = 4000;

// //Ref Lab 8
// var pool;
// //Creating the pool
// mysql.createPool({
// 	connectionLimit: 3,
// 	host: 'localhost',
// 	user: 'root',
// 	password: '',
// 	database: 'collegeDB',
// })
// .then((result) => {
// 	pool = result;
// })
// .catch((error) => {
// 	console.log(error)
// })

//Listening on chosen port
app.listen(port, () => {
	console.log("Listening on port " + port);
})

// View engine setup (ref geeksforgeeks) for use with render method
app.set('view engine', 'ejs');

//To home page
app.get('/',(req,res) => {
	res.sendFile(__dirname + "/views/home.html");
})

//Modules view
app.get('/listModules', (req, res) => {
	//res.sendFile(__dirname + "/views/modules.ejs");
	
	sqlDAO.getModules()
	.then((result) => {
		console.log(result)
		res.render("modules", { modules: result })
	})
	.catch((error) => {
		res.send(error)
	})
})

//lecturers view
app.get('/listLecturers', (req,res) => {
	//res.sendFile(__dirname + "/views/lecturers.ejs");
	mongoDAO.getLecturers()
	.then((result) => {
		console.log(result)
		res.render("lecturers", { lecturers: result })
	})
	.catch((error) => {
		res.send(error)
	})
})

//lecturers view
app.get('/listStudents', (req,res) => {
	//res.sendFile(__dirname + "/views/students.ejs");

	res.render("students");
})
