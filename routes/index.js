var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var User = require('../models/user');

var martaRail = 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=e894d4a6-72ca-4268-94ec-af98560a3cc8';
var martaBus = 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus';

function authenticate(req, res, next) {
	if(!req.isAuthenticated()) {
		req.flash('error', 'Oops! You are not logged in. Please sign up or login to continue.');
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

//Van adding routes
//GET logged in user and send to angular
router.get('/user', authenticate, function(req, res,next) {
  // User.findById(req.params.id)
  var data = {
    username: req.user.username,
    id: req.user._id,
    favorites: req.user.favorites,
    email: req.user.local.email
  };
  res.send(data);
});

//add favorite to favorites route
router.post('/users/:id', function(req, res, next){
  console.log('POSTING req.body is : ',req.body);
  User.findOneAndUpdate(
    {_id: currentUser.id},
    { $addToSet: {favorites: req.body.favorites }},
    // { $pull:     {favorites: req.body.removeFavorite}},
    {safe: true, upsert: true, new:true},
    function(err, user){
      if(err){
        console.log(err);
      } else {
        console.log(user);
      }
    }
);
});

//remove favorite from favorites array
router.put('/users/:id', function(req, res, next){
  console.log('DELETING req.body is:', req.body);
  User.findOneAndUpdate(
    {_id: currentUser.id},
    { $pullAll: {favorites: [req.body.nonFavorites]}},
    {safe: true, upsert: true, new:true},
    function(err, user){
      if(err){
        console.log(err);
      } else {
        console.log(user);
      }
    }
);
});

//LOGOUT
router.get('/logout', function(req,res){
  req.logout();
  console.log('successfully logged out!');
  res.redirect('/');
})
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
router.post('/login',
  passport.authenticate('local-login', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/login',
  })
  // function(req, res, next){
  //   // var config = {userId: 'id', pa}
  //   console.log('req  is ', req.body);
  //   console.log('req.user  is ', req.user);

    // res.render('index', {currentUserid:currentUser.id});
    // req.session.user = user;
    // console.log('global user is '+ currentUser);
    // res.redirect('/users/' + req.user.id);
    // res.redirect('/')
    // console.log('attempting to login');
    // console.log(req.body);
    // var loginStrat = passport.authenticate('local-login', {
    //     successRedirect: '/',
    //     failureRedirect: '/login',
    //     failureFlash: true
    // });
    // res.redirect('/users' + req.user.id);
    // loginStrat(req, res, next)
    // .then(function(success){
    //   console.log(success);
    // })
    // .catch(function(err){
    //   console.log(err);
    // })
// }
);

module.exports = router;
