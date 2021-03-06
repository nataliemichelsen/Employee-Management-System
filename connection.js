// connection.mysql connect
const mysql = require("mysql");
const util = require("util");

// create connection with root info
// match to seed & schema
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "CMS_db"
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log()
  });

  connection.query = util.promisify(connection.query)
  module.exports = connection;