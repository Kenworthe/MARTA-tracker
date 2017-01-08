angular.module('martaApp')
.component('liveTicker', {
	templateUrl: '/javascripts/ng-templates/live-ticker.html',
	controller: liveTickerController,
	controllerAs: '$ctrl'
})
function liveTickerController(railService, $filter, $timeout){
	console.log('liveTickerController is alive!');
	let self = this;
	self.selectedStation = 'MIDTOWN STATION';
	self.trains = [];
	self.buses = [];
	self.station = [];

	self.getAllTrainsRepeat = function(){
		railService.getAllTrains()
		.then( (response) => {
			self.trains = response.data;
			console.log(self.trains);
			$timeout(self.getAllTrainsRepeat, 2000);
		});
	}
	self.getAllTrainsRepeat();

// 	railService.getAllTrains()
// 	.then( (response) => {
// 		this.trains = response.data;
// 		this.station = $filter('filter')(response.data, { 'STATION': this.selectedStation });
// 		console.log(this.trains);
// 		console.log(this.station);
// 	})
}
