'use strict';

(function() {

class MainController {

  constructor(geolocation, campaign) {
    this.geolocation = geolocation;
    this.campaignSvc = campaign;

    this.offset = 1;
    this.geolocation.getIpInfo()
      .then(data => this.currentLoc = `${data.city}, ${data.region} ${data.postal}`)
    //this.getLocation()
    this.geolocation.getCurrentPosition()
      .then(data => this.position = data.coords)
      .then(data => this.geolocation.getAddress(Math.round(this.position.latitude*1000000)/1000000, Math.round(this.position.longitude*1000000)/1000000))
      .then(data => console.log(data.results));

  }

  getCampaignResults(distance, limit) {
    var self = this;
    var params = {
      longitude: self.loc[0],
      latitude: self.loc[1],
    };
    if (distance) params.extend({distance: distance});
    if (limit) params.extend({limit: limit});
    this.campaing.getCampaigns(params)
      .success(data => {
        self.campaigns = data;
        self.offset += 1;
      })
      .error(err => console.error(`Error: ${err}`));
  }

  sortCampaignsBy(type) {
    // Sorting Functions
  }

  calculateDonations() {
    // Calculate Donations
  }

}

MainController.$inject = ['geolocation', 'campaign'];

angular.module('rnangularApp')
  .controller('MainController', MainController);

})();
