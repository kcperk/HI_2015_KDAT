var LocalStrategy   = require('passport-local').Strategy;
var User            = require('./models/user');




module.exports = function(passport) {
    //Used for session information
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      },
      function (username, password, done) {
        console.log("In Register");
          User.findOne({ 'login' :  username }, function(err, user) {
            if (user) {
              console.log("Failed1");
              return done(null, false);
            } else {
                var newUser         = new User();
                newUser.login       = username;
                newUser.password    = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                  console.log("Succeed");
                  return done(null, newUser);
                });
            }
          })
    }));

    passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      },
      function (username, password, done) {
        console.log("In Login");
          User.findOne({ 'login' :  username }, function(err, user) {
            if (!user) {
              console.log("Failed1");
              return done(null, false);
            }
            if (!user.validPassword(password)) {
              console.log("Failed2");
              return done(null, false);
            }
            console.log("Succeed");
            return done(null, user);
        });
    }));
};
