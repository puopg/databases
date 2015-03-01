var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var dbConnection;

/// Function: connectToDB()
/// This function will connect to the SQL database. The reference
/// to the database is maintained in dbConnection. This should be called
/// from app.js
exports.connectToDB = function(){
  dbConnection = mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
  dbConnection.connect();
};

/// Function: insertToDB()
/// message: A message object that contains info regarding a message to save
/// callback: An operation to do once the save is complete
/// This function will insert a message into the SQL database.
exports.insertToDB = function(message, callback){
  var queryString = 'INSERT INTO messages SET ?';
  var queryArgs = {text: message.text, id_user: message.sentBy,
                   roomname: message.roomname, createdAt: message.createdAt};

  dbConnection.query(queryString, queryArgs, callback);
};

/// Function: retrieveMessagesFromDB()
/// callback: An operation to do after retrieving all messages
/// This function will retrieve all messages from the SQL database.
exports.retrieveMessagesFromDB = function(callback){
  var queryString = 'SELECT * FROM messages';
  var queryArgs = '';

  dbConnection.query(queryString, queryArgs, callback);
};

/// Function: retrieveUsersFromDB()
/// callback: An operation to do after retrieving all users
/// This function will retrieve all users from the SQL database
exports.retrieveUsersFromDB = function(callback){
  var queryString = 'SELECT * FROM users';
  var queryArgs = '';

  dbConnection.query(queryString, queryArgs, callback);
};

/// Function: insertUserToDB()
/// username: A username to insert into the 'users' table
/// callback: An operation to do after inserting a user
/// This function will insert a single user into the SQL database
exports.insertUserToDB = function(username, callback){
  var queryString = 'INSERT INTO users SET ?';
  var queryArgs = {username: username};

  dbConnection.query(queryString, queryArgs, callback);
};

/// Function: findUserInDB()
/// field: The column in the 'users' table to search
/// user: The user (either a name or id #) to search for
/// callback: An operation to do after finding the user
/// This function will find an entry in the 'users' table depending
/// on the field and user provided. This is so we can search for a username or
/// an id #.
exports.findUserInDB = function(field, user, callback){
  var queryString = 'SELECT * FROM users WHERE ' + field +'=' + dbConnection.escape(user);

  dbConnection.query(queryString, callback);
};

/// Function: retrieveFriendsFromDB()
/// NOT IMPLEMENTED
exports.retrieveFriendsFromDB = function(callback){
  var queryString = 'SELECT * FROM users';
  var queryArgs = '';

  dbConnection.query(queryString, queryArgs, callback);
};
