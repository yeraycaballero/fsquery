
var fsquery = require('./fsquery'),
    path    = require('path'),
    fs      = require('fs');

/*
*  return filename
*/

fsquery.registerAttributeHandler('filename', function(filename, callback) {
  var ext = path.extname(filename);
  callback.apply(this, [null, path.basename(filename).replace(ext, '')]);
});

/*
*  return file's extension
*/

fsquery.registerAttributeHandler('ext', function(filename, callback) {
  callback.apply(this, [null, path.extname(filename)]);
});

/*
*  return file's size
*/

fsquery.registerAttributeHandler('size', function(filename, callback) {
  var stat = fs.statSync(filename);    
  callback.apply(this, [null, stat.size]);
});
