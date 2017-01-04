var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST SIGN UP */
router.post('/', function(req, res, next) {
  console.log('posting signup user:');
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
