
var path    = require('path'),
    fs      = require('fs');

exports.attributes = {

  filename : function(filename, callback) {
    var ext = path.extname(filename)
    callback.apply(this, [null, path.basename(filename).replace(ext, '')])
  },

  ext : function(filename, callback) {
    callback.apply(this, [null, path.extname(filename)])
  },

  size : function(filename, callback) {
    var stat = fs.statSync(filename)
    callback.apply(this, [null, stat.size])
  }

};