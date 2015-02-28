var db = require('../db');

module.exports = {
  messages: [],

  chatterbox: {
    get: function (callback) {
      if(module.exports.messages.length === 0) {
        db.retrieveMessagesFromDB(function(end, results) {
          module.exports.messages = results.reverse(); // reverse order to have idx 0 as newest
          callback(module.exports.messages);
        });
      }
      else{
        callback(module.exports.messages);
      }
    }, // a function which produces all the messages
    post: function (message, callback) {
      db.insertToDB(message, function (end, results){
        message.id = results.insertId;
        module.exports.messages.unshift(message);
        callback();
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

