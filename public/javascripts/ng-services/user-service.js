//hello van
// reorder favorites
// UPDATE email address (with check for already taken)
// UPDATE username (with check for already taken)
// UPDATE password (with confirm password and current password)
// DELETE user (close account, with client side validation)
angular.module('martaApp')

.service('userService', function($http){
  this.selectedStop = 
  this.getUser = function(){
    return $http.get('/user');
  }
})

.controller('getUsersController', ['$http', 'userService', function($http, userService){
  var vm = this;
  vm.user = {};
  userService.getUser()
  .then(function(response){
    vm.user = response.data;
    console.log(vm.user);
  })
  .catch(function(err){
    console.log(err);
  });

  //this adds favorites
  this.postUser = function(){
    $http.post('/users/:id', {favorites:vm.favorites})
    .then(function(success){
      console.log(success);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  this.removeThisFavorite = function(){
    $http.put("/users/:id", {nonFavorites:vm.removeFavorite})
    .then(function(success){
      console.log('success',success);
    })
    .catch(function(err){
      console.log('error:',err);
    })
  }
}]);
