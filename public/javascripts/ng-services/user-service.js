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
    return $http.get("http://localhost:3000/users/" + id, {
      params: { id:id}
    });
  };
})

.controller('userController', function(userService){
  console.log('hello from user contorlelr !');
  this.users = [];
  userService.getUsers('586e628dc55a5c03e2dfd850')
  .then( (response) => {
    this.users = response.data;
    console.log(this.users.user.username);
  })
  .catch(function(err){
    console.log('Error: ' + err);
  });
});
