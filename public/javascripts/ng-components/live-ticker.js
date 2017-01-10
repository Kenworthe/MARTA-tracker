angular.module('martaApp')
.component('liveTicker', {
	templateUrl: '/javascripts/ng-templates/live-ticker.html',
	controller: liveTickerController,
	controllerAs: '$ctrl'
})
function liveTickerController(railService, busService, userService, $filter, $timeout){
	console.log('liveTickerController is alive!');
	let self = this;
	self.selectedStation = userService.userSelection;
	self.selectedBusStop = userService.userSelection;
	self.station = [];
	self.busStop = [];
	self.repeat = true;

	self.getStationRepeat = function(stationName){
		console.log(stationName);
		railService.getAllTrains()
		.then( (response) => {
			self.station = $filter('filter')(response.data, { 'STATION': stationName });
			console.log(self.station);
			if (self.repeat){
				$timeout(() => { self.getStationRepeat(stationName) }, 3000);
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
				$timeout(() => { self.getBusStopRepeat(stopName) }, 3000);
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
