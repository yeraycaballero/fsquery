// Operators
_ = require('lodash');

exports.gt = function(value) {
  return function(op1) {
    return op1 > value;
  }
};

exports.ge = function(value) {
  return function(op1) {
    return op1 >= value;
  }
};

exports.lt = function(value) {
  return function(op1) {
    return op1 < value;
  }
};

exports.le = function(value) {
  var op2 = value;
  return function(op1) {
    return op1 <= op2;
  }
};

exports.eq = function(value) {
  return function(op1) {
    return op1 == value;
  }
};

exports.in = function(array) {
  return function(value) {
    return _.contains(array, value);
  }
};

exports.notIn = function(array) {  
  return function(value) {
    return ! _.contains(array, value);
  }
};
