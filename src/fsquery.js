

var fsquery = {
  attributes : [],
  handlers   : {},
  operators  : {},
  
  in : function(path) {
    var clazz = require('./query').Query;
    return new clazz(path);
  },

  registerAttributeHandler : function(attributeName, handler) {
    this.attributes.push(attributeName);
    this.handlers[attributeName] = handler;
  },

  getAttributeHandler : function(attributeName) {
    return this.handlers[attributeName];
  }

};

module.exports = fsquery;