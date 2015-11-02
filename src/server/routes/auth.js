var isLoggedIn = require('./helpers').auth.isLoggedIn;
var express    = require('express');
var passport   = require('passport');
var router     = express.Router();

router.get('/loggedin', function (req, res, next) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', { session: true }, function (err, user, info) {
    if ( err  ) { return next(err) } // Returns 500 Error
    if ( user ) {
      req.logIn(user, function (err) { res.status(201).send({ user: user }) });
    } else {
      res.status(200).send({ message: info });
    };
  })(req, res, next);
});

router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if ( err  ) { return next(err) } // Returns 500 Error
    if ( user ) {
      req.logIn(user, function (err) { res.status(201).send({ user: user }) });
    } else {
      res.status(200).send({ message: info });
    };
  })(req, res, next);
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
})

module.exports = router;