var Message = require('./models/messages.js');
var Users = require('./models/user.js');
var express = require('express');
var path = require('path');

module.exports = function(app, passport) {

  app.get('/inbox', loggedIn, function(req, res) {
    username = req.user.login;
    Message.find({ $or: [ { 'sender' : username }, { 'receiver': username } ] }, function(err, messages) {
        res.render('inbox.html', {'logged' : 1, 'username' : username, 'messages' : messages});
    });
  });


  function loggedIn(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/');
  }
};
