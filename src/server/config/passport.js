var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var User     = require('../models/user');

// serialization functions
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


// login / signup settings
var authSettings = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};


// signup
var signupUser = function (req, email, password, done) {
  User.findOne({ 'email': email }, function (err, user) {
    if ( err )  { return done(err) }; // Throws 500
    if ( user ) { return done(null, false, { error: 'An account with this email already exists.'})};

    var newUser = new User();
    newUser.email = email;
    newUser.password = newUser.generateHash(password);

    newUser.save(function (err) {
      if ( err ) { throw err; }

      return done(null, newUser);
    });
  });
}


// login
var loginUser = function (req, email, password, done) {
  User.findOne({ 'email': email }).select('email password').exec(function (err, user) {
    if ( err )   { return done(err) };
    
    var errorMessage = { error: 'Your email or password was incorrect. Please try again.'};
    if ( !user ) { return done(null, false, errorMessage) };
    if ( !user.validPassword(user, password) ) {
      return done(null, false, errorMessage);
    }

    return done(null, user);
  });
};


// user various strategies
passport.use('local-signup', new Strategy(authSettings, signupUser));
passport.use('local-login', new Strategy(authSettings, loginUser));