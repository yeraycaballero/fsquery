
var path = require('path');
var fs   = require('fs');

exports.filename = function(filename, callback) {
  var ext = path.extname(filename);
  callback.apply(this, [null, path.basename(filename).replace(ext, '')]);
},

exports.ext = function(filename, callback) {
  callback.apply(this, [null, path.extname(filename)]);
},

exports.size = function(filename, callback) {
  var stat = fs.statSync(filename);    
  callback.apply(this, [null, stat.size]);
};
