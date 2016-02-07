'use strict';

(function(){
	class geolocationService {

	  constructor($http, $q, $window) {
	    this.http = $http;
	    this.q = $q;
	    this.window = $window;
	    this.loc;
	    // this.mapOptions = {
	    // 	center: new google.maps.LatLng(this.lat, this.lng),
	    // 	zoom: 15,
	    // 	mapTypeId: google.maps.MapTypeId.ROADMAP
	    // }
	  }
	  getIpInfo() {
	    return this.http.get('http://ipinfo.io/json').then(result => result.data);
	  }
	  getLatandLong() {
	    return this.getIpInfo().then(result => result.loc.split(',').map(val => {return Number(val)}));
	  }
	  getAddress(lat, lng) {
	  	console.log("get address called")
			console.log(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`)
  		return this.http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`)
				.success(result => result.data)
	  }
	  // getNavigatorLocation() {
	  // 	var self = this;
	  // 	var deferred = this.q.defer();
	  // 	var x, y;
	  // 	var options = {
			//   enableHighAccuracy: true,
			//   timeout: 5000,
			//   maximumAge: 0
			// };
			// var success = function (pos) {
			//   var crd = pos.coords;

			//   console.log('Your current position is:');
			//   console.log('Latitude : ' + crd.latitude);
			//   console.log('Longitude: ' + crd.longitude);
			//   console.log('More or less ' + crd.accuracy + ' meters.');
			// 	var lat = crd.latitude;
			// 	var lng = crd.longitude;
			// 	self.getAddress(lat, lng);
			// };
			// var error = function (err) {
			//   console.warn('ERROR(' + err.code + '): ' + err.message);
			// };
		 //  this.window.navigator.geolocation.getCurrentPosition(success, error, options);

		 //  return deferred.promise;

	  // }


	  getCurrentPosition() {
	  	var self = this;                                                                                                                                                                                                                                                                                                                                                                     
      var deferred = this.q.defer();
      var options = {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			};
      if (!self.window.navigator.geolocation) {
          deferred.reject('Geolocation not supported.');
      } else {
        self.window.navigator.geolocation.getCurrentPosition(
         function(position) {
             deferred.resolve(position);
         },
         function(err) {
             deferred.reject(err);
         });
      }
      return deferred.promise;
    }


	}
	// displayLocation(latitude,longitude){
 //  	this.http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`)
 //  		.success(result => result.data)
 //  };


	//geolocationService.$inject = ['$http'];

	angular.module('rnangularApp')
	  .service('geolocation', geolocationService);
})();
