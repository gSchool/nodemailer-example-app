// *** main dependencies *** //
var express      = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var mongoose     = require('mongoose');
var path         = require('path');
var passport     = require('passport');
var session      = require('express-session');


// *** express instance *** //
var app = express();


// *** view engine setup *** //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));


// *** mongoose *** ///
var dbConfig = require('./server/config/database');
mongoose.connect(dbConfig.url);


// *** require for passport *** //
app.use(session({ secret: 'mysecretsauce' }));
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/passport');


// *** routes *** //
var routes = require('./server/routes/index');


// *** main routes *** //
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});

// set up environment variables for app use
process.env.NODE_ENV = process.env.NODE_ENV || app.get('env');

module.exports = app;
