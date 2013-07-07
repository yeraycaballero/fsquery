var op = require('../src/operators').operators;
 

describe('Operators', function() {

  it ('eq should return true for the same number', function(done) {
    var op1 = 1, op2 = 1;
    op.eq(op2)(op1).should.be.true;
    done();
  });

  it ('eq should return false for different numbers', function(done) {
    var op1 = 1, op2 = 0;    
    op.eq(op2)(op1).should.be.false;
    done();
  });

  it ('lt should return true if op1 is less than op2', function(done) {
    var op1 = 0, op2 = 1;    
    op.lt(op2)(op1).should.be.true;
    done();
  });

  it ('lt should return false if op1 is not less than op2', function(done) {
    var op1 = 2, op2 = 1;    
    op.lt(op2)(op1).should.be.false;
    done();
  });

  it ('le should return true if op1 is less or equal than op2', function(done) {
    var op1 = 1, op2 = 1;    
    op.le(op2)(op1).should.be.true;
    op.le(1)(0).should.be.true;
    done();
  });
  
  it ('le should return false if op1 is not less or equal than op2', function(done) {
    var op1 = 1, op2 = 0;
    op.le(op2)(op1).should.be.false;
    done();
  });

  it ('ge should return true if op1 value is greater or equal than op2', function(done) {
    var op1 = 0, op2 = 0;    
    op.ge(op2)(op1).should.be.true;
    op.ge(1)(2).should.be.true;
    done();
  });
  
  it ('ge should return false if op1 is not greather or equal than op2', function(done) {
    var op1 = -1, op2 = 1;    
    op.ge(op2)(op1).should.be.false;
    done();
  });

  it ('in should return true if value exists in the array passing as second argument', function(done) {
    var op1 = 1, op2 = [1,2,3];
    op.in(op2)(op1).should.be.true;
    done();
  });

  it ('in should return false if the context value does not exist in the array passing as second argument', function(done) {
    var op1 = 2, op2 = [1,2,3];
    op.in(op2)(op1).should.be.true;
    done();
  });

  it ('notIn should return true if the context value is not in the array passing as second argument', function(done) {
    var op1 = 2, op2 = [4,3,1];
    op.notIn(op2)(op1).should.be.true;
    done();
  });

  it ('notIn should return false if the context value is in the array passing as second argument', function(done) {
    var op1 = 3, op2 = [4, 3, 1];
    op.notIn(op2)(op1).should.be.false;
    done();
  });

});


