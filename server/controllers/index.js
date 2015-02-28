var models = require('../models');
var _ = require('underscore');
var bluebird = require('bluebird');
var url = require('url');

module.exports = {
  chatterbox: {
    get: function (req, res) {
      // Parse the URL to get an object
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      var retString = JSON.stringify(models.messages);

      models.chatterbox.get(function(messages){
        res.writeHead(200);
        if(query.where){
          var roomname = JSON.parse(query.where).roomname;
          var filteredMessages = getMessagesByRoomname(models.messages, roomname);

          // Set the object to return as a new object with the filtered results
          retString = JSON.stringify(filteredMessages);
        }
        res.end(retString);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.chatterbox.post(req.body, function(){
        res.writeHead(201);
        res.end();
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

/// Function: getMessagesByRoomname(collection, roomname)
/// collection: The collection to filter
/// roomname: The roomname to filter the collection on
/// This helper function will return a collection of messages
/// with a given roomname attribute
var getMessagesByRoomname = function(collection, roomname){
  var filteredMessages = _.filter(collection, function(message){
      if(message.roomname === roomname) {
        return true;
      }
      return false;
  });
  return filteredMessages;
}
