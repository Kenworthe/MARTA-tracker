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
  // this.deleteUser = function() {
  //   console.log('hello from dlete user!');
  //   // $http({
  //   //   method: 'GET',
  //   //   url: "/users/587024073be0ce0b8d177128",
  //   //   // params: {id: id}
  //   // });
  //   $http( {
  //       method: 'DELETE',
  //       url: '/user/587024073be0ce0b8d177128',//Verify if item.id has a value...
  //       headers: {"Content-Type": "application/json;charset=utf-8"}
  //   } ).then(
  //       function ( response ) {
  //           console.log( 'Sucess', response );
  //       },
  //       function ( response ) {
  //           console.log( 'Fail', response )
  //       }
  //   );
  // };
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
.controller('getUsersController', ['$resource', '$http', function getUsersController($resource, $http, UsersService){
  var vm = this;
  var users = $resource("http://localhost:3000/users/:id", {id:'@id'});
  vm.getUser = function(){
    console.log('hello frm getUser');
    vm.user = users.get({id:'587024073be0ce0b8d177128'});
  };
  // vm.postUser = function(){
  //   users.save({id:'587024073be0ce0b8d177128'});
  //   console.log('hello from postUser');
  //
  // }
  // var vanUser = users.get({id:'587024073be0ce0b8d177128'}, function(){
  //   vanUser.abc = true;
  //   vanUser.favorites = "funkyFaves";
  //   vanUser.$save();
  // });
  // vm.postUser = function(){
  //   var response = vm.user.$save(function(){
  //     alert("user saved!");
  //     res.set('Content-Type', 'application/json'); // tell Angular that this is JSON
  //     res.send(JSON.stringify({success: success}));
  //   });
  // };
  this.postUser = function(){
    $http({
      method: 'PUT',
      url: "http://localhost:3000/users/587024073be0ce0b8d177128",
      // id: '587024073be0ce0b8d177128',
    })
    .then(function(success){
      console.log('succesful put',success);
    })
    .catch(function(err){
      console.log('unsuccess: ',err);
    })
  }
}]);
