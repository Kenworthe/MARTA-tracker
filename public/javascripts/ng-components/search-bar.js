angular.module('martaApp')
  // .component(searchBar , function(busService, railService) {
  //   console.log('searchBar is alive!');
  //   return function ($ctrl, element) {
  //     element.bind("keyup", function (event) {
  //       var val = element.val();
  //       if(val.length > 2) {
  //         $ctrl.busService.getAllBuses(val);
  //         $ctrl.railService.getAllTrains(val);
  //         }
  //       });
  //   });
  // });
  .component('searchBar', {
    templateUrl: '/javascripts/ng-templates/search-bar.html',
    controller: searchBarController,
    controllerAs: '$ctrl'
  })

function searchBarController(busService, railService, $filter){
  console.log('searchBarController is alive!');
  let self = this;
  self.trains = [];
  self.buses = [];

  busService.getAllBuses()
  .then(function(response){
    self.buses = response.data.TIMEPOINT;
    console.log(self.buses);
  })

  railService.getAllTrains()
  .then(function(response){
    self.trains = response.data.STATION;
    console.log(self.trains);
  })

}

// $ctrl.busService.getAllBuses()= function(val) {
//   $http({method: 'GET', url: 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus'}).
//   success(function(data, status) {
//     $ctrl.results.push(data);
//     busService.getAllBuses()
//   })
// }
// $ctrl.railService.getAllTrains()= function(val) {
//   $http({method: 'GET', url: 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=e894d4a6-72ca-4268-94ec-af98560a3cc8');
//   success(function(data, status) {
//     $ctrl.results.push(data);
//     railService.getAllTrains()
//   })
// }
