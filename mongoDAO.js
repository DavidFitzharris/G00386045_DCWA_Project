const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

//Imported Database
//Ref Lab9
const dbName = 'lecturerDB';
const collName = 'lecturers';

var lecturersDB;
var lecturers;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        lecturersDB = client.db(dbName)
        lecturers = lecturersDB .collection(collName)
    })
    .catch((error) => {
        console.log("Client error " + error)
    })

var getLecturers = function () {
    return new Promise((resolve, reject) => {
        //get all from lecturers
        var cursor = lecturers.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = {getLecturers}