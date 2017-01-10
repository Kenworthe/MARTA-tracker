angular.module('martaApp', ['ui.router', 'ngResource']) //Kenny deleted the ngResource dependency in the deployed version
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/javascripts/ng-templates/index.html',
    controller: 'homeController',
    controllerAs: '$ctrl'
  })
  .state('results', {
    url: '/results',
    templateUrl: '/javascripts/ng-templates/results.html',
    controller: 'resultsController',
    controllerAs: '$ctrl'
  })
  .state('favorites', {
    url: '/favorites',
    templateUrl: '/javascripts/ng-templates/favorites.html',
    controller: 'getUsersController',
    controllerAs: '$ctrl'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: '/javascripts/ng-templates/profile.html',
    controller: 'profileController',
    controllerAs: '$ctrl'
  });
  $urlRouterProvider
  .otherwise('/');
  // $locationProvider
  // .html5Mode({ enabled: true, requireBase: false });

})
.controller('homeController', function($http) {
  console.log('homeController is alive!');
  this.title = 'Homepage';
  // console.log('req.body is: ' + res.body);
  this.findUser = function(){

  $http({
    method:'GET',
    url: '/login',
  })
  .then(function(success){
    console.log('success was:', success);
    console.log(currentUser);
  })
  .catch(function(err){
    console.log('error:' + err);
  })
};
this.findUser();
})
.controller('resultsController', function() {
  console.log('resultsController is alive!');
  this.title = 'results page';
})
.controller('favoritesController', function() {
  console.log('favoritesController is alive!');
  this.title = 'favorites page';
})
.controller('profileController', function() {
  console.log('profileController is alive!');
  this.title = 'profile page';
})
