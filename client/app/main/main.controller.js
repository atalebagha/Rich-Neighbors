'use strict';

(function() {

class MainController {

  constructor(geolocation, campaign) {
    this.geolocation = geolocation;
    this.campaign = campaign;
    this.offset = 1;
    this.geolocation.getIpInfo()
      .then(data => this.currentLoc = `${data.city}, ${data.region} ${data.postal}`);
    this.geolocation.getCurrentPosition()
      .then(data => { this.loc = [data.coords.longitude, data.coords.latitude] });
      //.then(data => this.loc = data)
      //.then(() => this.getCampaignResults());

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
      .error( err => console.error(`Error: ${err}`));
  }

  sortCampaignsBy(type) {

  }

  calculateDonations() {

  }

}

MainController.$inject = ['geolocation', 'campaign'];

angular.module('rnangularApp')
  .controller('MainController', MainController);

})();
