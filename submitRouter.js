var Message = require('./models/messages.js');
var Users = require('./users.js')

var writeMessage = function (sender, receiver, subject, body, time, res) {
  var message = new Message({sender : sender, receiver : receiver, subject : subject, body : body, time : time});
  message.save(function (err, message) {
    if(err) {
      return addUsers(sender, res, 1, 0);
    }
    else {
      return addUsers(sender, res, 1, 1);
    }
  }
};

var normal = function(sender, res) {
  return addUsers(sender, res, 0, 0);
}

var addUsers = function(username, res, submit, success) {
  Users.count({ 'login' :  {'$ne': username }, function(err, count) {
    var t = Math.floor((Math.random() * count));
    User.find({ 'login' :  {'$ne': username }}).skip(t).next(), function(err, user) {
      return res.render('compose.ejs', {'username' : username, 'submit' : submit, 'success' : success, 'other' : other});
    }
  }});
};


exports.writeMessage = writeMessage;
exports.normal = normal;
