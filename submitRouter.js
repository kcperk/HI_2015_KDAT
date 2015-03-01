var Message = require('./models/messages.js');
var User = require('./models/user.js');
var express = require('express');
var path = require('path');

module.exports = function(app, passport) {

  app.get('/compose', loggedIn, function(req, res) {
    username = req.user.login
    return addUsers(username, res, 0, 0);
  });

  app.post('/send', function(req, res) {
    var sender = req.user.login;
    var receiver = req.body.receiver;
    var d = new Date();
    var time = d.getTime();
    var subject = req.body.subject;
    var body = req.body.message;
    var message = new Message({sender : sender, receiver : receiver, subject : subject, body : body, time : time});
    message.save(function (err, message) {
      if(err) {
        addUsers(sender, res, 1, 0);
      }
      else {
        addUsers(sender, res, 1, 1);
      }
    });
  });

  var addUsers = function(username, res, submit, success) {
    User.count({ 'login' :  {'$ne': username }}, function (err, count) {
      var t = Math.floor((Math.random() * count));
      console.log(t);
      User.findOne({ 'login' :  {'$ne': username }}, function(err, user1) {
        res.render('compose.html', {'username' : username, 'submit' : submit, 'success' : success, 'other' : user1});
      });
    }
  )};


  function loggedIn(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/');
  }
}
