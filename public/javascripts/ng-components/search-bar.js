angular.module('martaApp')
    .component('searchBar', {
        templateUrl: '/javascripts/ng-templates/search-bar.html',
        controller: searchBarController,
        controllerAs: '$ctrl'
    })

function searchBarController(busService, railService, $filter) {
    console.log('searchBarController is alive!');
    let self = this;
    self.trains = [];
    self.buses = [];
    


    busService.getAllBuses()
    .then(function(response) {
      self.buses = response.data;
      console.log(self.buses);

     railService.getAllTrains()
      .then(function(response) {
        self.trains = response.data;
        console.log(self.trains);

      })
    });
}
