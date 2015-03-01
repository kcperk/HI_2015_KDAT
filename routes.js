var express = require('express');
var path = require('path');

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
    logged = 0;
    username = "";
    if(req.isAuthenticated()) {
      logged = 1;
      username = req.user.login
    }
    res.render('inbox.ejs', {'logged' : logged, 'username' : username});
  });

  app.get('/fail', function(req, res) {
    res.render('fail.ejs');
  });


  app.get('/compose', loggedIn, function(req, res) {
    logged = 0;
    username = "";
    if(req.isAuthenticated()) {
      logged = 1;
      username = req.user.login
    }
    res.render('compose.ejs', {'logged' : logged, 'username' : username});
  });

  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/main',
      failureRedirect: '/'//
  }));

  app.get('/logout', loggedIn, function(req, res) {
    req.logout();
    res.redirect('/main');
  });
  app.post('/register', passport.authenticate('local-signup', {
      successRedirect: '/main',
      failureRedirect: '/'//
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
