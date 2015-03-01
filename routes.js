var express = require('express');
var path = require('path');
var send = require('./submitRouter.js');
var inbox = require('./inboxRouter.js');

module.exports = function(app, passport) {

  //Main page
  app.get('/main', loggedIn, function(req, res) {
    logged = 0;
    username = "";
    if(req.isAuthenticated()) {
      logged = 1;
      username = req.user.login
    }
    res.render('index.ejs', {'logged' : logged, 'username' : username});
  });

  //Inbox
  app.get('/inbox', loggedIn, function(req, res) {
    username = req.user.login
    inbox.display(res, username);
  });

  app.get('/fail', function(req, res) {
    res.render('fail.ejs');
  });


  app.get('/compose', loggedIn, function(req, res) {
    username = req.user.login
    send.normal(username, res, app);
  });

  app.post('/send', function(req, res) {
    var sender = req.user.login;
    var receiver = req.body.receiver;
    var d = new Date();
    var time = d.getTime();
    var subject = req.body.subject;
    var body = req.body.message;
    send.writeMessage(sender, receiver, subject, body, time, res, app);
  });

  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/main',
      failureRedirect: '/fail'
  }));

  app.get('/logout', loggedIn, function(req, res) {
    req.logout();
    res.redirect('/main');
  });
  app.post('/register', passport.authenticate('local-signup', {
      successRedirect: '/main',
      failureRedirect: '/fail'
  }));


  app.get('/', function(req, res) {
    logged = 0;
    username = "";
    if(req.isAuthenticated()) {
      logged = 1;
      username = req.user.login
    }
    res.render('index.ejs', {'logged' : logged, 'username' : username});
  });

  app.use(express.static(__dirname + '/inkWaves'));
  // Route for everything else.
  app.get('*', function(req, res){
    res.send('404 File Not found');
  });


  function loggedIn(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/');
  }
}
