var express = require('express');
var mongoDAO = require('./mongoDAO');
// const mysql = require('promise-mysql')
var sqlDAO = require('./sqlDAO');
var bp = require('body-parser');
//express validator ref https://express-validator.github.io/docs
//https://express-validator.github.io/docs/5.3.1/check-api.html
const { body, validationResult } = require('express-validator');

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
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/views/home.html");
})

//****************************Modules*******************//
//Modules view
app.get('/listModules', (req, res) => {
	sqlDAO.getModules()
		.then((result) => {
			// console.log(result)
			res.render("modules", { modules: result })
		})
		.catch((error) => {
			res.send(error)
		})
})

app.get('/modules/edit/:mid', (req, res) => {
	//Get by ID selected
	//res.render("editModules")
	sqlDAO.getModID(req.params.mid)
		.then((result) => {
			if (result != null) {
				res.render("editModule", { mid: result[0].mid, name: result[0].name, credits: result[0].credits })
				console.log(result);
			} else {
				res.send("ID Invalid")
			}
		})
		.catch((error) => {
			res.send(error)
		})
})

//Update Module by ID
//Currently not updating
app.post('/modules/edit/:mid',
	// body('name').isLength({min:5}),
	// body('credit').isIn([5, 10, 15]),
	(req, res) => {
		//Post update of module, only changing the name or credits
		let valCheck = validationResult(req);
		if (valCheck.isEmpty()) {
			sqlDAO.setModule(req.params.mid, req.body.name, req.body.credits)
				.then((result) => {
					console.log(result)
					console.log("No Errors")
					res.render("editModule", { mid: req.params.mid, name: req.body.name, credits: req.body.credits})
				})
				.catch((error) => {
					res.send(error)
					console.log("Edit Error")
				})
		} else 
		//Reload 
			res.render("editModule", { mid: req.params.mid, name: req.body.name, credits: req.body.credits})
	})

app.get('/modules/students/:mid', (req, res) => {
	sqlDAO.getStudentByMID(req.params.mid)
	.then((result) => {
		res.render("studentsMID", { students: result, mid: req.params.mid })
	})
	.catch((error) => {
		res.send(error)
	})
})


//****************************Lecturers*******************//
//lecturers view
app.get('/listLecturers', (req, res) => {
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

app.get('/addLecturer', (req, res) => {
	res.render("addLecturer")
})

app.post('/addLecturer', (req, res) => {
	console.log("Adding lecturer")
	mongoDAO.addLecturer(req.body._id, req.body.name, req.body.dept)
	.then((result) => {
		res.send("OK")
	})
	.catch((error) => {
		res.send("NOK")
	})
})

//****************************Students*******************//
//lecturers view
app.get('/listStudents', (req, res) => {
	//res.sendFile(__dirname + "/views/students.ejs");
	sqlDAO.getStudents()
		.then((result) => {
			console.log(result)
			res.render("students", { students: result })
		})
		.catch((error) => {
			res.send(error)
		})
})

app.get('/addStudent', (req, res) => {
	res.render("addStudent")
})

app.post('/addStudent', (req, res) => {
	console.log("Adding student")
	sqlDAO.addStudent(req.body.sid, req.body.name, req.body.gpa)
	.then((result) => {
		res.send("OK")
	})
	.catch((error) => {
		res.send("NOK")
	})
})

