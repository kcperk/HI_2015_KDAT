var Message = require('./models/messages.js');
var Users = require('./models/user.js');
var express = require('express');
var path = require('path');

module.exports = function(app, passport) {

  app.get('/compose', loggedIn, function(req, res) {
    username = req.user.login
    return addUsers(sender, res, 0, 0);
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
    Users.count({ 'login' :  {'$ne': username }}, function (err, count) {
      var t = Math.floor((Math.random() * count));
      User.find({ 'login' :  {'$ne': username }}).skip(t).next(), function(err, user) {
        res.render('compose.html', {'username' : username, 'submit' : submit, 'success' : success, 'other' : other});
      }
    });
  };


  function loggedIn(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/');
  }
}
