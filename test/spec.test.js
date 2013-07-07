
var fs      = require('fs'),
    Spec    = require('../src/spec').Spec,
    fsquery = require('../src/fsquery');


describe('Spec', function() {
  var op = fsquery.operators;

  it ('should pass a specification with a filename property', function(done) {
    var filename = '../assets/jordan.png';
    var spec     = new Spec( {filename : 'jordan'}, fsquery);

    var spy = sinon.spy();
    spec.satisfies(filename, spy);

    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith(filename);
    done();
  });

  it ('should pass a specification with a eq operator', function(done) {
  	var filename = '../assets/jordan.png';
  	var spec     = new Spec({filename : op.eq('jordan')}, fsquery);

    var spy = sinon.spy();
    spec.satisfies(filename, spy);

    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith(filename);
    done();
  });

  it ('should pass a specification with a lt operator', function(done) {
  	var filename = './assets/jordan.png';
  	var spec     = new Spec({size : op.lt(20000)}, fsquery);

    var spy = sinon.spy();
    spec.satisfies(filename, spy);

    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith(filename);
    done();
  });

  it ('should pass a specification with a le operator', function(done) {
    var filename = './assets/jordan.png';
    var spec     = new Spec({size : op.le(20000)}, fsquery);

    var spy = sinon.spy();
    spec.satisfies(filename, spy);

    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith(filename);
    done();
  });

  it ('should pass a specification with a gt operator', function(done) {
    var filename = './assets/jonshon.jpg';
    var spec     = new Spec({size : op.gt(20000)}, fsquery);

    var spy = sinon.spy();
    spec.satisfies(filename, spy);

    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith(filename);
    done();
  });

})
