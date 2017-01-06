angular.module('martaApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/javascripts/ng-templates/index.html',
    // template: '<h1> hello this is supposed to be index.html!</h1>',
    controller: 'homeController',
    controllerAs: '$ctrl'
  })
  .state('results', {
    url: '/results',
    templateUrl: '/javascripts/ng-templates/results.html',
    // template: '<h1> hello this is supposed to be results.html!</h1>',
    controller: 'resultsController',
    controllerAs: '$ctrl'
  })
  .state('favorites', {
    url: '/favorites',
    templateUrl: '/javascripts/ng-templates/favorites.html',
    controller: 'favoritesController',
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
.controller('homeController', function() {
  console.log('homeController is alive!');
  this.title = 'Homepage';
})
.controller('resultsController', function(railService, $filter) {
  console.log('resultsController is alive!');
  this.title = 'results page';
  this.selectedStation = '';
  this.trains = [];
  this.station = [];

		railService.getAllTrains()
		.then( (response) => {
			this.trains = response.data;
			// this.station = $filter('filter')(response.data, { 'STATION': station })
			console.log(this.trains);
			// console.log(this.station);
		});
})
.controller('favoritesController', function() {
  console.log('favoritesController is alive!');
  this.title = 'favorites page';
})
.controller('profileController', function() {
  console.log('profileController is alive!');
  this.title = 'profile page';
})
