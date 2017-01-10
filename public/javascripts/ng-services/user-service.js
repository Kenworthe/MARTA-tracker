//hello van
// reorder favorites
// UPDATE email address (with check for already taken)
// UPDATE username (with check for already taken)
// UPDATE password (with confirm password and current password)
// DELETE user (close account, with client side validation)
angular.module('martaApp')

.service('userService', function($http){
  this.getUser = function(){
    return $http.get('/user');
  }
})

.controller('getUsersController', ['$http', 'userService', function($http, userService){
  var vm = this;
  vm.user = {};
  userService.getUser()
  .then(function(response){
    vm.user = response.data;
    console.log(vm.user);
  })
  .catch(function(err){
    console.log(err);
  });

  //this adds favorites
  this.postUser = function(stop){
    vm.favorites = stop;
    $http.post("/users/:id", {favorites:vm.favorites})
    .then(function(success){
      console.log(success);
    })
    .catch(function(err){
      console.log(err);
    })
    vm.favorites = {};
  }

  this.removeThisFavorite = function(stop){
    vm.favorites = stop;
    $http.put("/users/:id", {favorites:vm.favorites})
    .then(function(success){
      console.log('success',success);
    })
    .catch(function(err){
      console.log('error:',err);
    })
    vm.favorites = {};
  }

  // this.setSelected = function(stop){
  //   vm.favorites = stop;
  //   console.log(vm.favorites);
  // }

      this.buses = ['10th Chs Allen','Alabama & Broad St.','Alabama & Forsyth','Alabama & Peachtree','Alison & Plaza','Alpharetta Hwy. & Commerce Pkwy.','Altadena & Cascade','Arno Dr.& Hollywood','Arthur Langford Jr. Pl.','Arts Center Station','Ashford Dunwoody & Perim.Ctr. We','Atlanta Ave. & Hank Aaron','Atlanta Industrial Park','Atlanta St. & Vir. Ave.','Atlanta Studt Movmt @ James P.Dr','Atlanta Tech & Metropolitan','Avon & Wyland','Avondale Station North Bay','Baker & Holmes','Barge Road Park & Ride Lot','Barnett-Virginia','Battle Forest & Flat Shoals','Beecher-Ben.E.Mays Westbbound','Bouldercrest & 3220 Bouldercrest','Bouldercrest & Brannen','Bouldercrest Rd. & Linecrest Rd','Bouldercrest-Eastland Rd.','Boulevard & Ponce de Leon','Boulevard NE & Old Wheat St NE','Briarcliff & Druid Hills','Briarcliff & LaVista','Briarcliff & N. Decatur','Briarcliff & Randolph','Briarcliff Rd.& Johnson Rd.','Briarwood Rd. & Buford Hwy.','Broad & Marietta St.','Brockett Rd. & E.Ponce De Leon','Brookhaven Station','Brookside Pkwy @ GSU','Brownlee & Scott','Brownlee Rd. & MLKing Jr. Dr.','Buffington & Buffington Cntr.','Buford & Clairmont','Buford & Druid Hill','Buford Highway & Oakcliff','Butner Rd. & Tell Rd.','Camp Creek & Desert','Camp Creek Mkt. Pl.','Candler & Glenwood','Candler & Memorial','Candler & Rainbow Way','Candler & Whites Mill','Carriage & Hillindale','Cascade & Beecher Rd.','Cascade & Fairburn','Cedar & Clarendon','Central Ave. & Sylvan Rd.','Chamblee Dunwoody& Dun Villiage','Chamblee Station East Bus Bay','Chamblee Station West Bus Bay','Chattahoochee & Southland','Cheshire Bridge & Piedmont','Clairmont & Buford','Clairmont & North Decatur','Clayton State University','Cleveland & Sylvan','Cleveland Ave & Jonesboro Rd','Clifton Church & Gresham Rd','Clifton Springs Health Center','College Park Station North','College Park Station South','Columbia & Memorial','Columbia & Snapfinger','Columbia Drive & Glenwood Ave.','Cooledge & Lawrenceville','Coronet Way & Moores Mill Road','Courtland St & Ellis St','Covington & S.Hairston','Covington Hwy.& Glenwood Rd.','Crim High School','Cumberland Transfer Center','Dalrymple-Roswell','Decatur & Ponce de Leon','Decatur Station','DeKalb Medical Center','Delowe Dr. & Campbellton Rd.','Delowe Dr. & Headland Dr','Dill & Metropolitan Parkway','DLHollow & Field','Dogwood Ave & King Arnold St','Doraville Station','Doris Dr. & Flat Shoals','Druid Hills & Lawrenceville','Dunwoody Pl. & Roswell Rd.','Dunwoody Station','E. Confederate Ave . @ Moreland','East Lake Station','East Point Station','English Ave. & Cameron M. Alexan','Fairburn Rd. & Bejamin Mays Dr.','Flat Shoals & Glenwood','Flat Shoals & Old National','Forest Parkway @ Lake Drive','Forest Pkwy & Barlett Dr','Fulton Ind. & Cascade','Fulton Industrial & MLK','Gardenwalk Blvd. & Riverdale Rd.','Georgia Perimeter College Decatu','Georgia State Station','Glenwood & Moreland','Godby & Old National','Green Forrest Dr. & Glendale Dr','Greenbriar & Headland','Gresham Rd SE & Flat Shoals','GRTA Park & Ride','Hairston & Rockbridge','Hamilton Blvd','Hamilton E. Holmes Station','Harper & Swallow','Hartsfield International Airport','Henry Thomas & Kipling Street','Highland & Ponce de Leon','Hightower Road. & St. James','Hillandale Dr. & Hillandale Pa','Hollowell & Holmes','Howell Mill & Paces Pavilion','Howell Mill Rd at Trabert Ave NW','Huff Rd & Howell Mill','Hwy 138 & Taylor Rd','Indian Creek Station (East Bay)','Inman Park Station (South Bay)','James Jackson & NorthWest Dr.','Jetal-North Avenue','John Wesley Dobbs & Ptree Centr','Jonesboro Rd. & Old National Hwy','Jonesboro Rd. & S. Pk','JPLwy & Boone Blvd','Justice Center','Kensington Station','King Arnold St. @ Sunset Dr','LaGrange & Boat Rock','Lakewood Station','Lawrenceville & Idlewood','Lenox Station','Lindbergh Station','Longview & Peachtree','Luckie St & North Ave.','M. L. King Jr. Dr. @ Westlake Av','M. Zion & M. Zion Pkwy','Macon Dr & Lakewood Ave','Main St.& Swift St.','Main Street & Toomes Street','Mall Pkwy @ Stonecrest Mall','Mansell Park/Ride','Marbut Rd. & Stone Mt./Lit. Rd.','Marietta Boulevard','Marietta-Moores Mill Center','McAfee Rd @ Candler Rd','Medical Center Station','Memorial & Moreland','Memorial & N.Hairston','Midtown Station','Montreal Rd. & Buice Dr.','Moores Mill Rd @ Northside Pkwy','Morris Rd. & One Verizon Pl','Mountain Industrial & Sarr','Moury & Middleton','N CAMP CREEK PKY @ DARRAH DR','N. Hairston & Ponce de Leon','N.Decatur & Oxford','N.Royal Atlanta & S.Royal Atlant','North Ave Station','North Decatur & Church','North Dekalb Mall','North Point Pky & Old Milton Pky','North Springs Station','Oakcliff & Pleasantdale','Oakland City Station','Old Milton Pky @ Haynes Bridge','Panola Industrial & Panola Rd.','Panola Rd. & Redan Rd.','Peachtree & 10th St.','Peachtree & Peeler','Peachtree Hills & Peachtree','Peeler & Shallowford','Piedmont-Roswell','Plainville Dr.-Plainville Circle','Pleasant Hill Rd. & Old National','Pollard St. & Ralph D. Abernathy','Ponce de Leon & N. Highland','Pryor Rd & University Ave','Pryor St. & Wall St.','Rainbow Dr & Candler','Ralph Abernathy & Lucille','Riverdale Park & Ride Lot','Rockbrige & Memorial','Roswell & Hammond','S. Candler St. & Midway Rd.','S. Flowers & Brandywine','S. Hairston & Redan Rd.','Sandy Springs Station','Snapfinger Woods & Everst School','Snapfingerwoods Dr. @ Wesley Cha','Social Security @ Centre Parkway','South Access & Shallowford','South DeKalb Mall','South Fulton Park & Ride','Southern Regional Medical Center','Stonecrest Trace','Stonewall Tell & Roosevelt Hwy','Tara Rd. & Battlecreek','Trinity Towers','Union Station Mall','VA Hospital','Valley Hill @ Lamar Hutcheson','Washington & Desert Dr','Welcome All & Jailette Rd.','West End Station','Windward Pkwy & State Road-9','Windward Pkwy Park/Ride'];


}]);
