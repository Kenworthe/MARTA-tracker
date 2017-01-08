app.component('busService', 'railService', function() {
  return function ($ctrl, element) {
    element.bind("keyup", function (event) {
      var val = element.val();
      if(val.length > 2) {
        $ctrl.busService.getAllBuses(val);
        $ctrl.railService.getAllTrains(val);
        }
      });
  });
});

$ctrl.busService.getAllBuses()= function(val) {
  $http({method: 'GET', url: 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus'}).
  success(function(data, status) {
    $ctrl.results.push(data);
    busService.getAllBuses()
  })
}
$ctrl.railService.getAllTrains()= function(val) {
  $http({method: 'GET', url: 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=e894d4a6-72ca-4268-94ec-af98560a3cc8');
  success(function(data, status) {
    $ctrl.results.push(data);
    railService.getAllTrains()
  })
}
