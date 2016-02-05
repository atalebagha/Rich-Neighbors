'use strict';

angular.module('rnangularApp', [
  'rnangularApp.auth',
  'rnangularApp.admin',
  'rnangularApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
