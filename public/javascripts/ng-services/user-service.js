angular.module('martaApp')

.service('userService', function($http){
  let self = this;
  self.userSelection = '';

  self.getUser = function(){
    return $http.get('/user');
  }

  self.postFavorite = function(station){
    return $http.post('/user', { favorites: station });
  }

  self.deleteFavorite = function(station){
    return $http.put('/user', { favorites: station });
  }
})

.controller('userController', function(userService){
  console.log('userController is alive!');
  
  let vm = this;
  vm.user = {};
  vm.favorites = [];
  vm.selectedFavorite = '';

  vm.getUserInfo = function(){
    userService.getUser()
    .then(function(response){
      if (response.data.id){
        vm.user = response.data;
        userService.userFavorites = response.data.favorites;
        console.log(vm.user);
        console.log(userService.userFavorites);
      }
      else {
        console.log('response.data did not include user.id.\nPlease log in to continue.');
      }
    })
    .catch(function(err){
      console.log(err);
    })
  }
  //fetch fresh user data upon loading state
  vm.getUserInfo();

  vm.addNewFavorite = function(station){
    userService.postFavorite(station)
    .then(function(){
      vm.getUserInfo();
    })
    .catch(function(err){
      console.log(err);
    })
  }

  vm.removeFavorite = function(station){
    userService.deleteFavorite(station)
    .then(function(){
      vm.getUserInfo();
  })
    .catch(function(err){
      console.log(err);
    })
  }
});
