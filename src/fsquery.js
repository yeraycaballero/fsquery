var quantity = require('./quantity'),
    Query    = require('./query').Query;

var fsquery = {

  attributeNames : [],
  operators  : {},
  attributes : {},
  quantity   : quantity,

  in : function(path) {
    return new Query(path, this);
  },

  reg : function(type, name, handler) {
    switch (type) {
      case 'attribute':
        if (this.attributeNames.indexOf(name) == -1) {
          this.attributeNames.push(name);
        }
        this.attributes[name] = handler;
      break
      case 'operator':
        this.operators[name] = handler;
      break
    }
  },

  get : function(type, name) {
    switch (type) {
      case 'attribute':
        return this.attributes[name];
      break
      case 'operator':
        return this.operators[name];
      break
    }    
  }
}

var attr = require('./attributes').attributes;

for (var name in attr) {
  fsquery.reg('attribute', name, attr[name]);
}

var operators = require('./operators').operators;

for (var name in operators) {
  fsquery.reg('operator', name, operators[name]);
}


module.exports = fsquery;