var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session  = require('express-session');
var bodyParser = require('body-parser');


var database = require('./db.js');

var app      = express();
mongoose.connect(database.url);

var port     = process.env.PORT || 1337;

//Setup Passport to save sessions
app.use(session({
  secret: 'sosecret',  // session secret
  resave: false,
  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.urlencoded({ extended: false }));



require('./routes.js')(app, passport);
require('./passport.js')(passport);

app.listen(port);
console.log("Server is up");
