angular.module('martaApp').service('busService', function($http){
  console.log('busService is alive!')
  var busService;

  $http({
    method: 'GET',
    url: 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus'
  }).then(onBusShowSuccess, onError);
})
.controller('busController', function(busService){
  console.log('busController is alive!')
})
var vm = this;
function onBusShowSuccess(response){
  console.log('here\'s the data for bus', response.data)
  vm.bus = response.data;
}
function onError(error){
  console.log('there was an error: ', error)
}
