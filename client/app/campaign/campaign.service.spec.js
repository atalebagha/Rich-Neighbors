'use strict';

describe('Service: campaign', function () {

  // load the service's module
  beforeEach(module('rnangularApp'));

  // instantiate service
  var campaign;
  beforeEach(inject(function (_campaign_) {
    campaign = _campaign_;
  }));

  it('should do something', function () {
    expect(!!campaign).toBe(true);
  });

});
