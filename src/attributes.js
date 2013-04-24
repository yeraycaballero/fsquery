
var path    = require('path'),
    fs      = require('fs');


var filename = function(filename, callback) {
  var ext = path.extname(filename);
  callback.apply(this, [null, path.basename(filename).replace(ext, '')]);
};

var ext = function(filename, callback) {
  callback.apply(this, [null, path.extname(filename)]);
};

var size = function(filename, callback) {
  var stat = fs.statSync(filename);    
  callback.apply(this, [null, stat.size]);
};

// fsquery.registerAttributeHandler('filename', filename);
// fsquery.registerAttributeHandler('ext', ext);
// fsquery.registerAttributeHandler('size', size);

exports.filename = filename;
exports.ext      = ext;
exports.size     = size;