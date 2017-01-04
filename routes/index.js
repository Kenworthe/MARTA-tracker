var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST SIGN UP */
router.post('/', function(req, res, next) {
  console.log('posting signup user:');
  console.log(req.body);
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    successFlash: true,
    failureFlash: true
  });
  return signUpStrategy(req, res, next);
});

module.exports = router;
