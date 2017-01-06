angular.module('martaApp').service('busService', function($http) {
    console.log('busService is alive!')
    this.getAllBuses = function(){
      $http({
          method: 'GET',
          url: 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus'
        }).then(onBusIndexSuccess, onError);
      }

    this.getOneBus = function(id){
        $http({
            method: 'GET',
            url: "http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetBusByRoute/" +id ,
              params: {id:id}
          }).then(onBusControllerSuccess, onError);
        }
})
    .controller('BusIndexController', function(busService){
      console.log('BusIndexController is alive!');
      busService.getAllBuses();
      busService.getOneBus('191');
})
var vm = this;

function onBusIndexSuccess(response){
    console.log('here\'s the data for all buses', response.data);
    vm.bus = response.data.bus;
}

function onBusControllerSuccess(response){
    console.log('here\'s the data for one bus', response.data);
    vm.bus = response.data.bus;
}

function onError(error) {
    console.log('there was an error: ', error);
}
