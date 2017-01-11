angular.module('martaApp')

.service('userService', function($http){
  let self = this;
  self.userSelection = '';
  self.user = {};
  self.favorites = [];

  self.getUser = function(){
    return $http.get('/user');
  }

  self.getUserInfo = function(){
    $http.get('/user')
    .then(function(response){
      if (response.data.id){
        self.user = response.data;
        self.favorites = response.data.favorites;
        console.log(self.user);
        console.log(self.favorites);
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
  
  self.postFavorite = function(station){
    // return $http.post('/users/:id', { favorites: station });
    return $http.post('/user', { favorites: station });
  }

  self.deleteFavorite = function(station){
    // return $http.put('/users/:id', { favorites: station });
    return $http.put('/user', { favorites: station });
  // self.getuserSelection = function(){
  //   console.log('getting user selection...', self.userSelection);
  //   return self.userSelection;
  // }
  // self.setUserSelection = function(newSelection){
  //   console.log('current user selection is...', self.userSelection);
  //   console.log('setting user stop to...', newSelection);
  //   return self.userSelection = newSelection;
  // }
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
        vm.favorites = response.data.favorites;
        console.log(vm.user);
        console.log(vm.favorites);
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
