var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var User = require('../models/user');

var martaRail = 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=e894d4a6-72ca-4268-94ec-af98560a3cc8';
var martaBus = 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus';

function authenticate(req, res, next) {
	if(!req.isAuthenticated()) {
    console.log('authenticated failed!');
		res.redirect('/');
	}
	else {
		next();
	}
}

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

router.get('/marta-rail', function(req, res, next){
  request(martaRail, function(error, response, body){
    if (error){
      console.log(error)
    }
    else {
      res.send(body);
    }
  })
});

router.get('/marta-bus', function(req, res, next){
  request(martaBus, function(error, response, body){
    if (error){
      console.log(error)
    }
    else {
      res.send(body);
    }
  })
});

//GET logged in user and send to angular
router.get('/user', authenticate, function(req, res,next) {
  var data = {
    id: req.user._id,
    username: req.user.username,
    email: req.user.local.email,
    favorites: req.user.favorites
  };
  res.send(data);
});

//add favorite to favorites route
// router.post('/users/:id', authenticate, function(req, res, next){
router.post('/user', authenticate, function(req, res, next){
  console.log('current user is...', currentUser);
  console.log('POSTING... req.body:', req.body);
  User.findOneAndUpdate(
    {_id: currentUser.id},
    { $addToSet: {favorites: req.body.favorites }}
    // {safe: true, upsert: true, new:true},
    // function(err, user){
    //   if (err){
    //     console.log(err);
    //   } 
    //   else {
    //     console.log(user);
    //   }
    // }
  )
  .then( function(response) {
    console.log('POST SUCCESSFUL; response is...', response);
    res.json(response);
  })
  .catch(function(err){
    console.log(err);
    return next;
  })
});

//remove favorite from favorites array
// router.put('/users/:id', authenticate, function(req, res, next){
router.put('/user', authenticate, function(req, res, next){
  console.log('current user is...', currentUser);
  console.log('DELETING... req.body:', req.body);
  User.findOneAndUpdate(
    {_id: currentUser.id},
    { $pullAll: {favorites: [req.body.favorites]}}
    // {safe: true, upsert: true, new:true},
    // function(err, user){
    //   if (err){
    //     console.log(err);
    //   } 
    //   else {
    //     console.log(user);
    //   }
    // }
  )
  .then( function(response) {
    console.log('PUT SUCCESSFUL; response is...', response);
    res.json(response);
  })
  .catch(function(err){
    console.log(err);
    return next;
  })
});

//LOGOUT
router.get('/logout', function(req,res){
  req.logout();
  console.log('successfully logged out!');
  res.redirect('/');
})

/* POST SIGN UP */
router.post('/signup', function(req, res, next) {
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
router.post('/login',
  passport.authenticate('local-login', {
    session: true,
    successRedirect: '/#!/favorites',
    failureRedirect: '/login',
  })
);

module.exports = router;
