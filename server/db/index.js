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
  var queryString = 'INSERT INTO messages SET ?';
  var queryArgs = {text: message.text, id_user: message.sentBy,
                   roomname: message.roomname, createdAt: message.createdAt};

  dbConnection.query(queryString, queryArgs, callback);
};

exports.retrieveMessagesFromDB = function(callback){
  var queryString = 'SELECT * FROM messages';
  var queryArgs = '';

  dbConnection.query(queryString, queryArgs, callback);
};

exports.retrieveUsersFromDB = function(callback){
  var queryString = 'SELECT * FROM users';
  var queryArgs = '';

  dbConnection.query(queryString, queryArgs, callback);
};

exports.insertUserToDB = function(username, callback){
  var queryString = 'INSERT INTO users SET ?';
  var queryArgs = {username: username};

  dbConnection.query(queryString, queryArgs, callback);
};

exports.findUserInDB = function(field, user, callback){
  var queryString = 'SELECT * FROM users WHERE ' + field +'=' + dbConnection.escape(user);

  dbConnection.query(queryString, callback);
};

exports.retrieveFriendsFromDB = function(callback){
  var queryString = 'SELECT * FROM users';
  var queryArgs = '';

  dbConnection.query(queryString, queryArgs, callback);
};
