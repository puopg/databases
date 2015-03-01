var db = require('../db');
var _ = require('underscore');

module.exports = {
  messages: [],
  userList: {},

  chatterbox: {
    get: function (callback) {
      // Cache the users
      if(_.isEmpty(module.exports.userList)) {
        console.log('init')
        db.retrieveUsersFromDB(function(end, results) {
          results.forEach(function(value){
              module.exports.userList[value.id] = value.username;
          });
        });
      }

      // Cache the messages
      if(module.exports.messages.length === 0) {
        db.retrieveMessagesFromDB(function(end, results) {
          results.forEach(function(value){
            value.sentBy = module.exports.userList[value.id_user];
          });
          module.exports.messages = results.reverse(); // reverse order to have idx 0 as newest
          callback(module.exports.messages);
        });
      }
      else{
        callback(module.exports.messages);
      }
    }, // a function which produces all the messages

    post: function (message, callback) {
      // Add user if new to DB
      module.exports.users.post(message.sentBy, function (end, results){
            message.sentBy = results.insertId;
            module.exports.userList[results.insertId] = message.sentBy;
      });

      db.findUserInDB('username', message.sentBy, function(end, result){
        message.sentBy = result[0].id;
        db.insertToDB(message, function (end, results){
          module.exports.messages.unshift(message);
          callback();
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (userId, callback) {
      db.findUserInDB('id', userId, function(end, result){
        callback(result);
      })
    },
    post: function (username, callback) {
      db.findUserInDB('username', username, function (end, result) {
        if(result.length === 0){
          console.log('Adding User to DB!');
          db.insertUserToDB(username, callback);
        }
        else{
          console.log("USER ALREADY EXISTS!");
        }
      });
    }
  }
};

