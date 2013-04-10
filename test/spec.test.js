
var fs     = require('fs'),
should = require('should'),
Spec   = require('../src/spec').Spec,
op     = require('../src/operators');


describe('Spec', function() {

  it ('should pass a specification with a filename property', function(done) {
  	var filename = '../assets/jordan.png';
  	var spec     = new Spec({filename : 'jordan'});

  	spec.satisfies(filename, function(res) {
  		if (filename.should.equal(res)) done();
  	});
  });

  it ('should pass a specification with a eq operator', function(done) {
  	var filename = '../assets/jordan.png';
  	var spec     = new Spec({filename : op.eq('jordan')});

  	spec.satisfies(filename, function(res) {
  		if (filename.should.equal(res)) done();
  	});
  });

  it ('should pass a specification with a lt operator', function(done) {
  	var filename = './assets/jordan.png';
  	var spec     = new Spec({size : op.lt(20000)});

  	spec.satisfies(filename, function(res) {		
  		if (filename.should.equal(res)) done();
  	});
  });

  it ('should pass a specification with a gt operator', function(done) {
    var filename = './assets/jonshon.jpg';
    var spec     = new Spec({size : op.gt(20000)});

    spec.satisfies(filename, function(res) {   
      if (filename.should.equal(res)) done();
    });
  });

})
