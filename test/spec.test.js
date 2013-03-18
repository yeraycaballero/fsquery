
var Spec = require('../src/spec').Spec,
    should = require('should');

describe('Spec', function() {

  it ('should pass a specification with a filename property', function() {
  	var spec     = new Spec({filename : 'jordan'});
  	var metadata = {filename : 'jordan'};
  	spec.satisfies(metadata).should.be.true;
  })

})
