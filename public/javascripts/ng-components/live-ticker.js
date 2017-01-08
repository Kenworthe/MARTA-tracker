angular.module('martaApp')
.component('liveTicker', {
	templateUrl: '/javascripts/ng-templates/live-ticker.html',
	controller: liveTickerController,
	controllerAs: '$ctrl'
})
function liveTickerController(railService, $filter, $timeout){
	console.log('liveTickerController is alive!');
	let self = this;
	self.selectedStation = 'FIVE POINTS STATION';
	self.trains = [];
	self.station = [];
	self.buses = [];
	self.repeat = true;

	self.getAllTrainsRepeat = function(){
		railService.getAllTrains()
		.then( (response) => {
			self.trains = response.data;
			if (self.repeat){
				$timeout(self.getAllTrainsRepeat, 3000);
			}
			else { return }
		});
	}
	self.getAllTrainsRepeat();

	self.getStationRepeat = function(stationName){
		railService.getAllTrains()
		.then( (response) => {
			self.station = $filter('filter')(response.data, { 'STATION': stationName });
			if (self.repeat){
				$timeout(() => { self.getStationRepeat(stationName) }, 3000);
			}
			else { return }
		});
	}
	self.getStationRepeat(self.selectedStation);

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
