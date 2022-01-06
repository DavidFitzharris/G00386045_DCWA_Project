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

module.exports = {getModules};