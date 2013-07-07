_        = require('lodash'),
quantity = require('./quantity');

exports.operators = {

  gt : function(value) {
    var op2 = (quantity.isQuantity(value))? quantity.isQuantity.toBytes(value) : value;
    return function(op1) {
      return op1 > op2;
    }
  },

  ge : function(value) {
    var op2 = (quantity.isQuantity(value))? quantity.isQuantity.toBytes(value) : value;
    return function(op1) {
      return op1 >= op2;
    }
  },

  lt : function(value) {
    var op2 = (quantity.isQuantity(value))? quantity.isQuantity.toBytes(value) : value;
    return function(op1) {
      return op1 < op2;
    }
  },

  le : function(value) {
    var op2 = (quantity.isQuantity(value))? quantity.isQuantity.toBytes(value) : value;
    return function(op1) {
      return op1 <= op2;
    }
  },

  eq : function(value) {
    var op2 = (quantity.isQuantity(value))? quantity.isQuantity.toBytes(value) : value;
    return function(op1) {
      return op1 == op2;
    }
  },

  in : function(array) {
    return function(value) {
      return _.contains(array, value);
    }
  },

  notIn : function(array) {
    return function(value) {
      return ! _.contains(array, value);
    }
  }

};