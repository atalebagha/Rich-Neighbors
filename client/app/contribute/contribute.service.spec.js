'use strict';

describe('Service: contribute', function () {

  // load the service's module
  beforeEach(module('rnangularApp'));

  // instantiate service
  var contribute;
  beforeEach(inject(function (_contribute_) {
    contribute = _contribute_;
  }));

  it('should do something', function () {
    expect(!!contribute).toBe(true);
  });

});
