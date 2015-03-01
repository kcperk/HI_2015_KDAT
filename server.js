var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session  = require('express-session');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser')


var database = require('./db.js');

var app      = express();
mongoose.connect(database.url);

var port     = process.env.PORT || 1337;

//Setup Passport to save sessions
app.use(session({
  secret: 'sosecret',  // session secret
  cookie: { maxAge: 60000, secure: false },
  resave: false,
  saveUninitialized: false}));
app.use(cookieParser('sosecret'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.set('view engine', 'ejs');



require('./routes.js')(app, passport);
require('./passport.js')(passport);

app.listen(port);
console.log("Server is up");
