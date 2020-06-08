// connection.mysql connect
const mysql = require("mysql");

// create connection with root info
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "",
    password: "",
    database: "CMS"
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

function emsConnection() {
  connection.query("SELECT  FROM ", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}