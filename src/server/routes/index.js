var express = require('express');
var router = express.Router();

var auth     = require('./auth');
router.use('/', auth);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/partials/:name/:partial?', function (req, res) {
  var name = req.params.name, partial = req.params.partial;
  var path = ( partial ) ? 'partials/' + name + '/' + partial : 'partials/' + name;
  
  res.render(path);
});

module.exports = router;