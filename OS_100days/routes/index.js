var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'os_100days' });
});
router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'faq' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});

module.exports = router;
