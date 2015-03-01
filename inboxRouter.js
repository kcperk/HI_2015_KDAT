var Message = require('./models/messages.js');
var Users = require('./users.js');


var displayMessages = function (username, res) {
  Message.find({ $or: [ { 'sender' : username }, { 'receiver': receiver } ] }, function(err, user) {
    return res.render('inbox.ejs', {'logged' : 1, 'username' : username, 'users' : users});
};

exports.display = displayMessages;
