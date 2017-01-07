angular.module('martaApp')
	.service('railService', function($http, $filter, $timeout){

		this.getAllTrains = function(){
			return $http.get('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=e894d4a6-72ca-4268-94ec-af98560a3cc8');
		}
		// this.getAllTrainsRepeat = function(){
		// 	return $timeout(getAllTrains, )
		// }
	})
	.controller('railController', function(railService, $filter){
		this.selectedStation = 'MIDTOWN STATION';
		this.trains = [];
		this.station = [];

		railService.getAllTrains()
		.then( (response) => {
			this.trains = response.data;
			this.station = $filter('filter')(response.data, { 'STATION': this.selectedStation })
			console.log(this.trains);
			console.log(this.station);
		});

	})
