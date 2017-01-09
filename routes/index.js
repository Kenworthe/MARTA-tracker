var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('signed in as:'+ currentUser);
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
  // User.findById({id:currentUser.id})
  .then(function(user){
    if (!user) return next(makeError(res, 'User not found', 404));
    console.log('userjson is ', user);

    res.json({ user: user});
  })
  .catch(function(err) {
    return next(err);
  });
});

// router.post('/users/:id/favorites', function(req, res,next) {
//   User.findById(req.params.id)
//   .then(function(user){
//     if (!user) return next(makeError(res, 'User not found', 404));
//     User.favorites = 'this';
//     res.json({ favorites: user.username});
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });




// router.put('/users/:id/', function(req, res,next) {
//   User.findById(req.params.id, function(err, user){
//     if(err){
//       res.status(500).send(err);
//     } else{
//       // user.favorites.$push:'first';
//       user.favorites = $push.favorites('5 Points');
//       user.save(function(err, user){
//         if (err){
//           res.status(500).send(err);
//         } else {
//           res.send(user);
//         }
//       });
//     }
//   });

//changed put to post
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

router.delete('/users/587024073be0ce0b8d177128', function(req, res,next) {
  // .delete( function (req, res) {     // <===== defined inside 'put',
  User.findOneAndRemove( {id: req.params.id}, function (err,res){
    res.json( {
      message: 'got rid of this user',
      user: result
    });
  })

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
router.post('/login',
  passport.authenticate('local-login', {session:false}),
  function(req, res, next){
    console.log('req.user is ' + req.user);
    global.currentUser = req.user;
    req.session.user = user;
    console.log('global user is '+ currentUser);
    // res.redirect('/users/' + req.user.id);
    // res.redirect('/')
    console.log('attempting to login');
    console.log(req.body);
    var loginStrat = passport.authenticate('local-login', {
        successRedirect: '/',
        currentUser: req.user,
        failureRedirect: '/login',
        failureFlash: true
    });
    // res.redirect('/users' + req.user.id);
    return loginStrat(req, res, next);
});

module.exports = router;
