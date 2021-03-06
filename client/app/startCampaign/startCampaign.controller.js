'use strict';


angular.module('bApp.StartCampaignController', ['ngFileUpload'])
  .controller('StartCampaignController', ['$scope', '$http', 'Auth', '$state', '$rootScope', '$stateParams' , 'Upload', function($scope, $http, Auth, $state, $rootScope, $stateParams, Upload) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    if (Auth.isLoggedIn() === false) {
      console.log("not logged in!");
      $state.go('login');
    }

    $scope.formData = {};
    $scope.id = '';
    $scope.formData.user_id = $scope.getCurrentUser()._id;

    //****************
    //**supplies & volunteers form
    //****************
    $scope.supplies = [{
      //   'name': 'supply',

    }];

    $scope.volunteers = [{
      //   'name': 'supply',

    }];

    $scope.pictures = [{}];

    // $scope.supplyForm = {};

    //$scope.supplyForm.name = $scope.supplies.supply.name;
    // $scope.supplyForm.quantity = $scope.supply.quantity;
    $scope.campaign_id = '';
    // $scope.stateParams = "";

    $scope.addNewChoice = function() {
      var newItemNo = $scope.supplies.length + 1;
      $scope.supplies.push({
        //  'name': 'supply' + newItemNo
      });
    };

    $scope.removeChoice = function() {
      var lastItem = $scope.supplies.length - 1;
      $scope.supplies.splice(lastItem);
    };


    $scope.addNewVolunteer = function() {
      var newItemNo = $scope.volunteers.length + 1;
      $scope.volunteers.push({
        //  'campaign_id': 'supply' + newItemNo
      });
    };

    $scope.removeVolunteer = function() {
      var lastItem = $scope.volunteers.length - 1;
      $scope.volunteers.splice(lastItem);
    };



   $scope.upload = function (file) {
        console.log("upload called");
        Upload.upload({
            url: 'http://localhost:9000/api/images',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.createCampaign = function() {
      $http.post('/api/campaigns', $scope.formData)
        .success(function(data) {
          console.log(data)
          $scope.id = data._id
          $scope.campaign_id = $scope.id



           // _.forEach($scope.pictures, function(picture) {
           //  var newPicture = _.merge(picture, {
           //    'campaign_id': $scope.campaign_id
           //  });
           //  console.log('new picture', newPicture);

           //  $http.post('/api/images', newPicture)
           //    .success(function(data) {
           //      //$scope.formData = {}; // clear the form so our user is ready to enter another
           //      //  $scope.campaigns = data;

           //      // console.log($scope.campaign_id)
           //      console.log(data);
           //      // $scope.id = data._id
           //      //  console.log($scope.id)


           //    })
           //    .error(function(data) {
           //      console.log($scope.getCurrentUser());
           //      console.log('Error Pics: ' + data);
           //    });




          _.forEach($scope.supplies, function(item) {
            var newItem = _.merge(item, {
              'campaign_id': $scope.campaign_id
            });
            console.log('new item', newItem);

            $http.post('/api/items', newItem)
              .success(function(data) {
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                //  $scope.campaigns = data;

                // console.log($scope.campaign_id)
                console.log(data);
                // $scope.id = data._id
                //  console.log($scope.id)


              })
              .error(function(data) {
                console.log($scope.getCurrentUser())
                console.log('Error: ' + data);
              });

          })

          _.forEach($scope.volunteers, function(item) {
            var newItem = _.merge(item, {
              'campaign_id': $scope.campaign_id
            });

            $http.post('/api/volunteers', newItem)

            .success(function(data) {
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                //  $scope.campaigns = data;
                console.log($scope.campaign_id)
                console.log(data);
                // $scope.id = data._id
                //  console.log($scope.id)


              })
              .error(function(data) {
                console.log($scope.getCurrentUser())
                console.log('Error: ' + data);
              });

          })




          $state.go('submitCampaignsSuccess', $stateParams)



        })
        .error(function(data) {
          console.log($scope.getCurrentUser())
          console.log('Error: ' + data);
        });
    }




  }]);
