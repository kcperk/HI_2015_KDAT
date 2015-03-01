var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session  = require('express-session');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session);
var swig = require('swig');


var db = require('./db.js');

var app      = express();
mongoose.connect(db.url);

var port     = process.env.PORT || 1337;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('sosecret'));
//Setup Passport to save sessions
app.use(session({
  secret: 'sosecret',  // session secret
  cookie: { maxAge: 6000000000, secure: false },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.engine('html', swig.renderFile);

app.set('view engine', 'html');




require('./inboxRouter.js')(app, passport);
require('./submitRouter.js')(app, passport);
require('./routes.js')(app, passport);
require('./passport.js')(passport);

app.listen(port);
console.log("Server is up");
