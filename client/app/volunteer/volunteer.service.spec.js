'use strict';

describe('Service: volunteer', function () {

  // load the service's module
  beforeEach(module('rnangularApp'));

  // instantiate service
  var volunteer;
  beforeEach(inject(function (_volunteer_) {
    volunteer = _volunteer_;
  }));

  it('should do something', function () {
    expect(!!volunteer).toBe(true);
  });

});
