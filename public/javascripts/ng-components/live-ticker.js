angular.module('martaApp')
.component('liveTicker', {
	templateUrl: '/javascripts/ng-templates/live-ticker.html',
	controller: liveTickerController,
	controllerAs: '$ctrl'
})

function liveTickerController(railService, $filter){
	console.log('liveTickerController is alive!');
	this.selectedStation = 'MIDTOWN STATION';
	this.trains = [];
	this.buses = [];
	this.station = [];

	railService.getAllTrains()
	.then( (response) => {
		this.trains = response.data;
		this.station = $filter('filter')(response.data, { 'STATION': this.selectedStation });
		
		console.log(this.trains);
		console.log(this.station);
	})
}
