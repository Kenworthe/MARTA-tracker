angular.module('martaApp')
  .service('busService', function($http, $filter) {
    console.log('busService is alive!')
    this.getAllBuses = function(){
      $http({
          method: 'GET',
          url: 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus'
        }).then(onBusIndexSuccess, onError);



    this.getOneBus = function(id){
        $http({
            method: 'GET',
            url: "http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetBusByRoute/" +id ,
              params: {id:id}
          }).then(onBusControllerSuccess, onError);
        }
      }
})
    .controller('busController', function(busService, $filter){
       console.log('busController is alive!');
      this.userSelected = null;
  		this.buses = [];
  		this.timepoint = [];

      busService.getAllBuses()
       .then( (response) => {
        this.buses = response.data;
        this.timepoint = $filter('filter')(response.data, { 'TIMEPOINT': timepoint})
        console.log(this.buses);
        console.log(this.timepoint);

      })

      busService.getOneBus('Dunwoody station')
       .then( (response) => {
         this.timepoint = response.data;
         console.log(this.timepoint)
       })
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
