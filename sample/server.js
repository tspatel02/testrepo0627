var express = require('express');
var app = express();
var fs = require("fs");
const bodyParser = require('body-parser');
const mysql = require('mysql')

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
// create database school;

// use school;

// CREATE TABLE school.student (
//     id int NOT NULL AUTO_INCREMENT,
//     firstName varchar(255) NOT NULL,
//     lastName varchar(255),
//     PRIMARY KEY (id)
// );


const options = {
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'school'
}

const connection = mysql.createConnection(options)

connection.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
 });

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
   res.header("content-type", "application/json");
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   
  next();
});

app.get('/students', function (req, res) {   
   connection.query("SELECT * FROM  `school`.`student` ", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
})


app.post('/students', function (req, res) {   
   var firstname = req.body.firstName;
   var lastname = req.body.lastName;

   console.log ("post");
   console.log(req.body);

   connection.query("INSERT INTO `school`.`student` (`firstname`, `lastname`) VALUES ('"+firstname+"', '"+lastname+"'); ", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
})

app.get('/students/:studentId', function (req, res) {
   connection.query("SELECT * FROM `school`.`student` where id = " + req.params.studentId, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
})

app.put('/students/:studentId', function (req, res) {
  console.log ("put");
  console.log(req.body);

   connection.query("UPDATE  `school`.`student` set firstname = '"+req.body.firstName+ "' , lastname ='" +req.body.lastName + "' where id = " + req.params.studentId, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
})

app.delete('/students/:studentId', function (req, res) {
   connection.query("DELETE FROM  `school`.`student`  WHERE id = " + req.params.studentId, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
})


app.post('/addStudent', function (req, res) {
   // First read existing users.
   res.end( JSON.stringify(req.body));
})

var server = app.listen(9000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})