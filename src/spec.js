var _       = require('lodash');


var Spec = function(config, context) {
  this.config = config;
  this.context = context;
};

Spec.prototype.satisfies = function(file, callback) {
  var propertiesCount = Object.keys(this.config).length;
  var index = 1;
  var result = true;

  var satisfiesCallback = function(res) {
    result = result && res;

    if (result && index++ === propertiesCount) {      
      callback.call(this, file); 
    }   
  }
  
  for (var key in this.config) {
    this.satisfiesProperty(file, key, satisfiesCallback) 
  }
};

Spec.prototype.satisfiesProperty = function(file, key, callback) {
  var attributeHandler = this.context.get('attribute', key);

  if (attributeHandler == null || attributeHandler == undefined) throw new Error('Attribute: ' + key + ' not found.');

  attributeHandler.apply(this, [file, function(err, res) {
    if (err) return callback.call(err, false);

    var value = this.config[key];
    var operator = (typeof value == 'function')? value : this.context.get('operator', 'eq')(value);

    callback.call(this, operator.call(this, res));
  }])  
};

exports.Spec = Spec;