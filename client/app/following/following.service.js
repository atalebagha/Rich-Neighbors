'use strict';

(function() {
  class followingFactory {
    constructor($http, Auth) {
      this.http = $http;
      this.auth = Auth;
    }
    getFollowers(campaign) {
      return this.http.get(`/api/campaigns/${campaign}/followers`).success(result => result.data);
    }
    getMyFollowings() {
      if (this.auth.isLoggedIn()) {
        return this.http.get(`/api/users/my/followings`).success(result => result.data);
      } // this if statement may need to be placed in the controller so it doesn't return an error in concole when logged off
    }
    checkIfFollower(campaign) {
      return this.getMyFollowings().then(data => { console.log(_.filter(data, val => {return val.campaign_id === campaign })) });
    }
    follow(campaign) {
      var _this = this;
      if (this.auth.isLoggedIn()) {
        var data = { 'user_id': _this.auth.getCurrentUser()._id, 'campaign_id': campaign };
        return this.http.post('/api/followers', data);
      }
    }
    unfollow(followid) {
      if (this.auth.isLoggedIn()) {
        return this.http.delete(`/api/followers/${followid}`);
      }
    }
  }

  followingFactory.$inject = ['$http', 'Auth'];

  angular.module('bApp')
    .service('followingFactory', followingFactory);
})();
