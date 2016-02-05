'use strict';

angular.module('rnangularApp.auth', [
  'rnangularApp.constants',
  'rnangularApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
