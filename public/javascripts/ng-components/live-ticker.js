angular.module('martaApp')
.component('liveTicker', {
	templateUrl: '/javascripts/ng-templates/live-ticker.html',
	controller: liveTickerController,
	controllerAs: '$ctrl'
})
function liveTickerController(railService, busService, $filter, $timeout){
	console.log('liveTickerController is alive!');
	let self = this;
	self.selectedStation = 'FIVE POINTS STATION';
	self.selectedBusStop = 'BROOKHAVEN';
	self.trains = [];
	self.station = [];
	self.buses = [];
	self.busStop = [];
	self.repeat = true;

	// self.getAllTrainsRepeat = function(){
	// 	railService.getAllTrains()
	// 	.then( (response) => {
	// 		self.trains = response.data;
	// 		if (self.repeat){
	// 			$timeout(self.getAllTrainsRepeat, 3000);
	// 		}
	// 		else { return }
	// 	});
	// }
	// self.getAllTrainsRepeat();

	self.getStationRepeat = function(stationName){
		console.log(stationName);
		railService.getAllTrains()
		.then( (response) => {
			self.station = $filter('filter')(response.data, { 'STATION': stationName });
			console.log(self.station);
			if (self.repeat){
				$timeout(() => { self.getStationRepeat(self.selectedStation) }, 3000);
			}
			else { return }
		});
	}
	self.getStationRepeat(self.selectedStation);

	self.getBusStopRepeat = function(stopName){
		console.log(stopName);
		busService.getAllBuses()
		.then( (response) => {
			self.busStop = $filter('filter')(response.data, { 'TIMEPOINT': stopName });
			console.log(self.busStop);
			if (self.repeat){
				$timeout(() => { self.getBusStopRepeat(self.selectedBusStop) }, 3000);
			}
			else { return }
		});
	}
	self.getBusStopRepeat(self.selectedBusStop);

//timeout function to stop refresh after a set duration.
	$timeout(function(){
		self.repeat = false;
		console.log('Repeat set to false!');
	}, (2*60*1000));

//stop timeout if user changes URL
	// $rootScope.$on('$locationChangeStart', function(){
	// 	self.repeat = false;
	// })
}
