'use strict';

describe('Service: following', function () {

  // load the service's module
  beforeEach(module('rnangularApp'));

  // instantiate service
  var following;
  beforeEach(inject(function (_following_) {
    following = _following_;
  }));

  it('should do something', function () {
    expect(!!following).toBe(true);
  });

});
