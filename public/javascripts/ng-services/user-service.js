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
  this.getUsers = function(id) {
    return $http.get('http://localhost:3000/users/');
  };
})

.controller('userController', function(userService){
  console.log('hello from user contorlelr !');
  this.users = [];
  userService.getUsers()
  .then( (response) => {
    this.users = response.data.users;
    console.log(this.users);
  })
  .catch(function(err){
    alert('Error: ' + err);
  });
});
