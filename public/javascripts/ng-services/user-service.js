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

// .service('userService', function($http) {
//   console.log('userService is working!');
//   this.getUsers = function() {
//     return $http.get("/users/");
//   };
//   this.getOneUser = function(id) {
//     return $http.get("/users/" + id, {
//       params: { id:id}
//     });
//   };
//
// })
//
// // test service for ngResource
// .service('UsersService', function($resource){
//   let vm = this;
//   vm.users = $resource("/users/:id", {id:'@id'});
//   vm.getUser = function(id){
//       console.log('hello frm getUser');
//       vm.user = users.get({id:id});
//       console.log('user is ', vm.user);
//     };
//
//   // return $resource("http://localhost:3000/users/:id");
// })


// .controller('userController', function(userService){
//   console.log('hello from user contorlelr !');
//   userService.getUsers()
//   .then( (response) => {
//     this.users = response.data.users;
//     console.log(this.users);
//   })
//   .catch(function(err){
//     console.log('Error: ' + err);
//   });
//   userService.getOneUser('586d728a411f310a80930fa7')
//   .then( (response) => {
//     this.favorites = response.data.user.favorites;
//     console.log('this.favorites is ', this.favorites);
//   })
// })
.service('userService', function($http){
  this.getUser = function(){
    return $http.get('/user');
  }
})

//test controller
.controller('getUsersController', ['$resource', '$http', 'userService', function($resource, $http, userService){
  var vm = this;
  // var users = $resource("/users/:id", {id:'@id'});
  vm.user = {};
  userService.getUser()
  .then(function(response){
    vm.user = response.data;
    console.log(vm.user);
  })
  .catch(function(err){
    console.log(err);
  });
  // vm.getUser = function(){
  //   // vm.oneUser = users.get({id:id},function(success){
  //   //   console.log('success', success);
  //   //   // console.log('req.query.params are:' + req.query.user);
  //   // }, function(err){
  //   //   console.log('error:', err);
  //   // });
  //   // $http.get("/users/:id")
  //   // .then(function(success){
  //   //   console.log('found user', success);
  //   // })
  //   // .catch(function(err){
  //   //   console.log(err);
  //   // })
  //   // vm.user.$promise.then(function(response){
  //   //   console.log(response);
  //   //   vm.foundUser = vm.user;
  //   // });
  //   console.log('foundUser is: ',vm.user);
  // };


  // vm.getUser('587024073be0ce0b8d177128');
  // userService.getOneUser("5872e302551dae200b87733c")
  //  .then(function(response){
  //    vm.user = response.data;
  //    console.log('this.user is ', success);
  //  })
  //  .catch(function(err){
  //    console.log('err: ',err);
  //  });
  //this adds favorites
  this.postUser = function(){
    $http.post("/users/:id", {favorites:vm.favorites})
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
