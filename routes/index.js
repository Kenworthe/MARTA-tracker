var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/marta', function(req, res, next){
  res.json('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=e894d4a6-72ca-4268-94ec-af98560a3cc8')
});

/* POST SIGN UP */
router.post('/signup', function(req, res, next) {
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

//POST login -> check passport
router.post('/login', function(req, res, next){
  console.log('attempting to login');
  console.log(req.body);
    var loginStrat = passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });
    return loginStrat(req, res, next);
});

module.exports = router;
