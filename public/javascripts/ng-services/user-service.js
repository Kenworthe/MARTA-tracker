//hello van
// get user info ,
// add favorites (post)
// reorder favorites
//delete favorites
// UPDATE email address (with check for already taken)
// UPDATE username (with check for already taken)
// UPDATE password (with confirm password and current password)
// DELETE user (close account, with client side validation)
angular.module('martaApp')


.service('userService', function($http) {
  console.log('userService is working!');
  this.getUsers = function() {
    return $http.get("http://localhost:3000/users/");
  };
  this.getOneUser = function(id) {
    return $http.get("http://localhost:3000/users/" + id, {
      params: { id:id}
    });
  };
  
})

// test service for ngResource
.service('UsersService', function($resource){
  return $resource("http://localhost:3000/users/:id");
})


.controller('userController', function(userService){
  console.log('hello from user contorlelr !');
  userService.getUsers()
  .then( (response) => {
    this.users = response.data.users;
    console.log(this.users);
  })
  .catch(function(err){
    console.log('Error: ' + err);
  });
  userService.getOneUser('586d728a411f310a80930fa7')
  .then( (response) => {
    this.favorites = response.data.user.favorites;
    console.log('this.favorites is ', this.favorites);
  })
})

//test controller
.controller('getUsersController', ['$resource', '$http', function($resource, $http, UsersService){
  var vm = this;
  // this.favorites = 'testing it out';

  var users = $resource("http://localhost:3000/users/:id", {id:'@id'});
  vm.getUser = function(){
    console.log('hello frm getUser');
    vm.user = users.get({id:'587024073be0ce0b8d177128'});
  };

  this.postAUser = function(){
    $http.put("http://localhost:3000/users/:id", {favorites:vm.favorites})
    .then(function(success){
      console.log(success);
    })
    .catch(function(err){
      console.log(err);
    })
  }
}]);
