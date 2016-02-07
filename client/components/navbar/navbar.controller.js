'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  },
  {
    'title': 'Create',
    'state': 'create'
  },
  {
    'title': 'Contribute',
    'state': 'contribute'
  },
  {
    'title': 'About',
    'state': 'about'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('rnangularApp')
  .controller('NavbarController', NavbarController);
