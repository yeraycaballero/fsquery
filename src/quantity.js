var _  = require('lodash');

var quantity = {

  isQuantity : function(value) {
    var result = true;
    try {
      this.parse(value);
    } catch (e) {
      result = false;
    }
    return result;
  },

  toBytes : function(chars) {
    var result = 0;
    var quantity = this.parse(chars);
    
    switch (quantity.unit) {
      case 'k':
      case 'kb' : 
        result = quantity.number * 1024;
      break;
      case 'm':
      case 'mb' : 
        result = quantity.number * 1024 * 1024;
      break;
      case 'g':
      case 'gb' : 
        result = quantity.number * 1024 * 1024 * 1024;
      break;
      case 't':
      case 'tb' : 
        result = quantity.number * 1024 * 1024 * 1024 * 1024;
      break;
      case 'p':
      case 'pb' : 
        result = quantity.number * 1024 * 1024 * 1024 * 1024 * 1024;
      break;
      case 'e':
      case 'eb': 
        result = quantity.number * 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
      break;
      case '':
        result = quantity.number;
      break;
    }
    return result;
  },
  
  parse : function(chars) {
    var quantity = {};
    try {
      quantity.number = parseInt(chars.match(/\d+/i)[0]);
      quantity.unit   = chars.replace(quantity.number, '').trim().toLowerCase();
    } catch (e) {
      if (_.isNumber(quantity.number) && quantity.number >= 0) {
        quantity.unit = 'B';
      }
      else throw 'Illegal quantity ' + chars;
    }
    return quantity;
  }
}

module.exports = quantity;
