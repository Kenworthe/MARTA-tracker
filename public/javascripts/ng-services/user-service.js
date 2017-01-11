angular.module('martaApp')

.service('userService', function($http){
  let self = this;
  self.userSelection = '';

  // self.getuserSelection = function(){
  //   console.log('getting user selection...', self.userSelection);
  //   return self.userSelection;
  // }
  // self.setUserSelection = function(newSelection){
  //   console.log('current user selection is...', self.userSelection);
  //   console.log('setting user stop to...', newSelection);
  //   return self.userSelection = newSelection;
  // }

  self.getUser = function(){
    return $http.get('/user');
  }

  self.postFavorite = function(station){
    return $http.post('/users/:id', { favorites: station });
  }

  self.deleteFavorite = function(station){
    return $http.put('/users/:id', { favorites: station });

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
      vm.user = response.data;
      console.log(vm.user);
      console.log(vm.user.favorites);
      vm.favorites = response.data.favorites;
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
