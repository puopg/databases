var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var dbConnection;

exports.connectToDB = function(){
  dbConnection = mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
  dbConnection.connect();

  return dbConnection;
};


exports.insertToDB = function(message){
  // user, message, room, time
  var queryString = 'INSERT INTO chat';
  var queryArgs = {user: message.username, message: message.text,
                   room: message.roomname, time: 50};

  dbConnection.query(queryString, queryArgs, function(err, results) {
          done();
  });
};


exports.retrieveMessagesFromDB = function(){
  var queryString = 'SELECT * FROM chat';
  var queryArgs = '';

  dbConnection.query(queryString, queryArgs, function(err, results) {
          done();
  });
};
