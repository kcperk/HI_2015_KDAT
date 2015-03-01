var express = require('express');
var path = require('path');

module.exports = function(app, passport) {
  app.use(express.static(__dirname + '/inkWaves'));

  //Main page
  app.get('/main', loggedIn, function(req, res) {
    res.sendFile(__dirname + '/inkWaves/main.html');
  });

  app.get('/fail', function(req, res) {
    res.sendFile(__dirname + '/inkWaves/fail.html');
  });


  app.get('/compose', loggedIn, function(req, res) {
    res.sendFile(__dirname + '/inkWaves/main.html')
  });

  app.post('/login',  passport.authenticate('local-login', {
      successRedirect: '/main',
      failureRedirect: '/fail'
  }));

  app.post('/register',   passport.authenticate('local-signup', {
      successRedirect: '/main',
      failureRedirect: '/fail'
  }));

  app.get('/', loggedIn, function(req, res) {
    res.sendFile(__dirname + '/inkWaves/index.html')
  });

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
