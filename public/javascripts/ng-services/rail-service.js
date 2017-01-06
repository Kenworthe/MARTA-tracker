angular.module('martaApp')
	.service('railService', function($http, $filter){
		this.getAllTrains = function(){
			return $http.get('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=e894d4a6-72ca-4268-94ec-af98560a3cc8');
		}
		// this.getOneStation = function(station){
		// 	let selectedStation = station;
		// 	$http.get('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=e894d4a6-72ca-4268-94ec-af98560a3cc8')
			// .then( (response) => {
			// 	return $filter('filter')(response.data, { 'STATION': selectedStation });
			// })
		// }
	})
	.controller('railController', function(railService, $filter){
		this.userSelected = null;
		this.trains = [];
		this.station = [];

		railService.getAllTrains()
		.then( (response) => {
			this.trains = response.data;
			this.station = $filter('filter')(response.data, { 'STATION': station })
			console.log(this.trains);
			console.log(this.station);
		});
		// railService.getOneStation('MIDTOWN STATION')
		// .then( (response) => {
		// 	this.station = response.data;
		// 	console.log(this.station); //this prints undefined or it errors.
		// });
	})
