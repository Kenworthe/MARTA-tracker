var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

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

//Van adding routes
router.get('/users', function(req, res, next) {
  User.find({})
  .then(function(users){
    res.json( {users: users});
  })
  .catch(function(err){
    return next(err);
  });
});

router.get('/users/:id', function(req, res,next) {
  User.findById(req.params.id)
  .then(function(user){
    if (!user) return next(makeError(res, 'User not found', 404));
    res.json({ user: user});
  })
  .catch(function(err) {
    return next(err);
  });
});

// end of Van adding routes

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
