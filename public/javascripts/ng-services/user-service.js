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
  vm.user = [];
  // vm.favorites = [];
  // vm.selectedFavorite = '';

  // vm.getUserFromService = function(){
  //   vm.user = userService.user
  //   console.log('from controller...', vm.user);
  // }
  // vm.getUserFromService();
  //fetch fresh user data upon loading state
  // vm.getUserFromService();



  self.getUserInfo = function(){
    return $http.get('/user')
    .then(function(response){
      if (response.data.id){
        self.user = response.data;
        console.log('from service...', self.user);
      }
      else {
        console.log('response.data did not include user.id.\nPlease log in to continue.');
      }
    })
    .catch(function(err){
      console.log(err);
    })
  }
  self.getUserInfo();




  vm.addNewFavorite = function(station){
    userService.postFavorite(station)
    .then(function(){
      vm.getUserInfo();
      console.log('post successfull! here is the new user: ', vm.user.favorites)
    })
    .catch(function(err){
      console.log(err);
    })
  }

  vm.removeFavorite = function(station){
    userService.deleteFavorite(station)
    .then(function(){
      vm.getUserInfo();
      console.log("Here is the new", vm.user.favorites);
  })
    .catch(function(err){
      console.log(err);
    })
  }
});
