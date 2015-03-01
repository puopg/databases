var db = require('../db');
var _ = require('underscore');

module.exports = {
  messages: [],
  userList: {},

  chatterbox: {
    get: function (callback) {
      // Cache the users, if the userList is already populated,
      // don't do anything, they are already cached.
      if(_.isEmpty(module.exports.userList)) {
        console.log('Caching Users from database-> userList')

        // Access the 'users' table and for each entry,
        // add the entry into the user cache {id : username}
        db.retrieveUsersFromDB(function(end, results) {
          results.forEach(function(value){
              module.exports.userList[value.id] = value.username;
          });
        });
      }

      // Cache the messages into messages []
      if(module.exports.messages.length === 0) {
        console.log('Caching messages from database -> messages')

        // Get all the messages from the database
        // and for each message entry, convert the sentBy field to
        // the real name of the user.
        db.retrieveMessagesFromDB(function(end, results) {
          results.forEach(function(value){
            value.sentBy = module.exports.userList[value.id_user];
          });
          // reverse order to have idx 0 as earliest
          module.exports.messages = results.reverse();
          callback(module.exports.messages);
        });
      }
      else{
        // Otherwise, if the messages are already cached, just send it back
        callback(module.exports.messages);
      }
    }, // a function which produces all the messages

    post: function (message, callback) {
      // When a POST request is made,
      // 1. Save the user into the 'users' table. (if needed)
      // 2. Save the user into the userList cache
      // 3. Insert the message into the message cache
      // 4. Change the message.sentBy to an id #
      // 5. Insert the modified message into the 'messages' table
      // 6. When that has finished, change it back to the username
      //    otherwise, the name will be the id #
      module.exports.users.post(message.sentBy, function (end, result){
        var username = message.sentBy;
        module.exports.userList[result.insertId] = message.sentBy;
        module.exports.messages.unshift(message);

        // This result is from the call to insertUserToDB
        // It will either have an insertId where the new user was inserted
        // or undefined since the user already existed.
        if(result.insertId === undefined){
          message.sentBy = result[0].id;
        }
        else{
          message.sentBy = result.insertId;
        }

        db.insertToDB(message, function (end, results){
          message.id = results.insertId;
          message.sentBy = username;
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
          callback(null, result);
        }
      });
    }
  }
};

