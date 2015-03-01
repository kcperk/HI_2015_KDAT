var express = require('express');
var path = require('path');

module.exports = function(app, passport) {
  app.use(express.static(__dirname + '/inkWaves'));

  //Main page
  app.get('/main', loggedIn, function(req, res) {
    logged = false
    username = ""
    if(req.isAuthenticated()) {
      console.log(req.session);
      console.log('In');
      logged = 1;
      username = req.user.login
      console.log(logged);
      console.log(username);
    }
    res.render('index.ejs', {'loggedIn' : logged, 'username' : username});
  });

  app.get('/fail', function(req, res) {
    res.render('fail.ejs');
  });


  app.get('/compose', loggedIn, function(req, res) {
    logged = 0
    username = ""
    console.log("Yo");
    if(req.isAuthenticated()) {
      console.log(req.session);
      console.log('In');
      logged = 1;
      username = req.user.login
      console.log(logged);
      console.log(username);
    }
    res.render('compose.ejs', {'logged' : logged, 'username' : username});
  });

  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/main',
      failureRedirect: '/fail'
  }));

  app.get('/logout', loggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });
  app.post('/register', passport.authenticate('local-signup', {
      successRedirect: '/main',
      failureRedirect: '/fail'
  }));

  app.get('/', function(req, res) {
    logged = 0
    username = ""
    console.log("Yo");
    if(req.isAuthenticated()) {
      console.log(req.session);
      console.log('In');
      logged = 1;
      username = req.user.login
      console.log(logged);
      console.log(username);
    }
    res.render('index.ejs', {'logged' : logged, 'username' : username});
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
