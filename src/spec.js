var _ = require('lodash');

var Spec = function(config) {
  this.config = config;
}

Spec.prototype.satisfies = function(metadata) {
  var result = true;
  for (var key in this.config) {  
  	result = result && _.isEqual(this.config[key], metadata[key]);
  }
  return result;
}

exports.Spec = Spec;