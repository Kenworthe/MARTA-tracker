angular.module('martaApp')
    .component('searchBar', {
        templateUrl: '/javascripts/ng-templates/search-bar.html',
        controller: searchBarController,
        controllerAs: '$ctrl'
    })

function searchBarController(busService, railService, userService, $filter, $state) {
    console.log('searchBarController is alive!');
    let self = this;
    self.userSelection = userService.userSelection;
    self.bothFilter =  null;
    self.trains = railService.trains;
    // self.buses = busService.buses;
    // self.both = self.trains.concat(self.buses);

    self.setBothFilter = function(input){
      self.bothFilter = input;
    }

    self.setSelection = function(input){
        console.log('user selection set to: ' + input);
        console.log(self.userSelection);
        userService.userSelection = input;
        console.log(userService.userSelection);
        // self.userSelection = input;
    };

    self.goToResults = function(){
        $state.go('results');
    }
}
