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
};


exports.insertToDB = function(message, callback){
  // user, message, room, time
  var queryString = 'INSERT INTO messages SET ?';
  var queryArgs = {text: message.text, sentBy: message.sentBy,
                   roomname: message.roomname, createdAt: message.createdAt};

  dbConnection.query(queryString, queryArgs, callback);
};


exports.retrieveMessagesFromDB = function(callback){
  var queryString = 'SELECT * FROM messages';
  var queryArgs = '';

  dbConnection.query(queryString, queryArgs, callback);
};
