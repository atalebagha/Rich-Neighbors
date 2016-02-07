'use strict';

describe('Service: supply', function () {

  // load the service's module
  beforeEach(module('rnangularApp'));

  // instantiate service
  var supply;
  beforeEach(inject(function (_supply_) {
    supply = _supply_;
  }));

  it('should do something', function () {
    expect(!!supply).toBe(true);
  });

});
