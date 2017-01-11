angular.module('martaApp')
.component('navBar', {
  templateUrl: '/javascripts/ng-templates/nav-bar.html',
  controller: navBarController,
  controllerAs: '$ctrl'
})
function navBarController(userService){
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

}

// this.removeFavorite = function(station){
//   userService.deleteFavorite(station)
//   .then(function(){
//     vm.getUserInfo();
//     console.log("Here is the new", vm.user.favorites);
// })
//   .catch(function(err){
//     console.log(err);
//   })
// }
