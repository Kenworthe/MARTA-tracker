angular.module('martaApp')
  .service('busService', function($http, $filter) {
    console.log('busService is alive!')

    this.getAllBuses = function(){
      return $http({
          method: 'GET',
          // url: 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus'
          url: '/marta-bus'
      })
      // .then(function(buses){
      //   // console.log('buses are ', buses);
      //   return buses;
      // })
      // .catch(function(err){
      //   console.log('error:', err);
      // });
    };

    this.getOneBus = function(id){
      return $http({
          method: 'GET',
          url: "http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetBusByRoute/" + id ,
          params: {id: id}
      })
      // .then(function(bus){
      //   return bus;
      // })
      // .catch(function(err){
      //   console.log('error:', err);
      // });
    }
  })

//   .controller('busController', function(busService, $filter){
//        console.log('busController is alive!');
//       this.title = 'bus';
//       this.userSelected = null;
//   		this.buses = [];
//       // busService.getAllBuses();
//       // console.log(this.buses);
//   		this.timepoint = [];
//
//       // busService.getAllBuses()
//       //  .then( (response) => {
//       //   this.buses = response.data;
//       //   this.timepoint = $filter('filter')(response.data, { 'TIMEPOINT': timepoint})
//       //   console.log('buses are', this.buses);
//       //   console.log(this.timepoint);
//
//       })
//
//       busService.getOneBus('Dunwoody station')
//        .then( (response) => {
//          this.timepoint = response.data;
//          console.log(this.timepoint)
//        })
// })
