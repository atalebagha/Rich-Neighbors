'use strict';

(function(){
	class geolocationService {

	  constructor($http, $q, $window) {
	    this.http = $http;
	    this.q = $q;
	    this.window = $window;
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
	  getNavigatorLocation() {
	  	var options = {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			};
			var success = function (pos) {
			  var crd = pos.coords;

			  console.log('Your current position is:');
			  console.log('Latitude : ' + crd.latitude);
			  console.log('Longitude: ' + crd.longitude);
			  console.log('More or less ' + crd.accuracy + ' meters.');
				return pos;
			};
			var error = function (err) {
			  console.warn('ERROR(' + err.code + '): ' + err.message);
			};
		  return function () { navigator.geolocation.getCurrentPosition(success, error, options) };
	  }
	  getCurrentPosition() {
      var deferred = this.q.defer();
      var options = {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			};
      if (!this.window.navigator.geolocation) {
        deferred.reject('Geolocation not supported.');
      } else {
        this.window.navigator.geolocation.getCurrentPosition(
          function (position) {
            deferred.resolve(position);
          },
          function (err) {
            deferred.reject(err);
          },
          options);
      }
      return deferred.promise;
    }


	}

	//geolocationService.$inject = ['$http'];

	angular.module('rnangularApp')
	  .service('geolocation', geolocationService);
})();
