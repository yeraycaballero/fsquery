var _    = require('lodash'),
attr = require('./attributes'),
op   = require('./operators');

var Spec = function(query) {
  this.query = query;
};

Spec.prototype.satisfies = function(file, callback) {
  var propertiesCount = Object.keys(this.query).length;
  var index = 1;
  var result = true;

  var satisfiesCallback = function(res) {
    result = result && res;

    if (result && index++ === propertiesCount) {
      callback.call(this, file);  
    }   
  };
  
  for (var key in this.query) {
    this.satisfiesProperty(file, key, satisfiesCallback); 
  }
};

Spec.prototype.satisfiesProperty = function(file, key, callback) {
  var attributeHandler = attr[key];

  if (attributeHandler == null || attributeHandler == undefined) throw new Error('Attribute: ' + key + ' not found.');

  attributeHandler.apply(this, [file, function(err, res) {
    if (err) return callback.call(this, false);

    var value = this.query[key];
    var operator = (typeof value == 'function')? value : op.eq(value);

    callback.call(this, operator.call(this, res));
  }]);  
};

exports.Spec = Spec;