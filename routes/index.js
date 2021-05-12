var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { title: 'Express' });
});

/* GET no indexed page */
router.get('*', function(req, res, next) {
  const error = new Error('Page not found');
  error.statusCode = 404;
  next(error);
});

module.exports = router;
