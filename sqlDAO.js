const mysql = require("promise-mysql")

//Ref Lab 8
var pool;

mysql.createPool({
	connectionLimit: 3,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'collegeDB',
})
	.then((result) => {
		pool = result;
	})
	.catch((error) => {
		console.log(error)
	})

//get modules from collegedb
var getModules = () => {
	return new Promise((resolve, reject) => {
		pool.query('select * from module')
			.then((result) => {
				console.log("Getting module table..")
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

//Get by Mod ID
var getModID = (mid) => {
	return new Promise((resolve, reject) => {
		let query = {
			sql: "select * from module where mid = ?",
			values: [mid]
		}
		pool.query(query)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

//Set new name and credits
var setModule = (mid, name, credits) => {
	console.log("setModule called")
	return new Promise((resolve, reject) => {
		let query = {
			sql: "update module set mid = ?, credits = ? where name = ?",
			values: [mid, credits, name]
		}
		pool.query(query)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}


//Get students from collegedb
var getStudents = () => {
	return new Promise((resolve, reject) => {
		pool.query('select * from student')
			.then((result) => {
				//console.log("Getting student table..")
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

var getStudentByMID = (mid) => {
	return new Promise((resolve, reject) => {
		let query = {
			sql: "select * from student s left join student_module m on s.sid = m.sid where m.mid = ?",
			values: [mid]
		} 
		pool.query(query)
		.then((result) => {
			resolve(result)
		})
		.catch((error) => {
			reject(error)
		})
	})
}

module.exports = { getModules, getStudents, getModID, setModule, getStudentByMID };