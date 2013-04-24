
var _       = require('lodash'),     
    fs      = require('fs'),
    util    = require('util'),
    path    = require('path'),
    events  = require('events'),
    Spec    = require('./spec').Spec,
    FSWalker = require('./fswalker').FSWalker;

Query = function Query(sPath) {
  this.queryPath = _setPath.call(this, sPath);
  this.fswalker  = new FSWalker(); 
}

util.inherits(Query, events.EventEmitter);

Query.prototype.where = function(config) {
  fs.readdir(this.queryPath, function(err, files) {
    if (err) { this.emit('error', err); }

    _findFiles.apply(this, [files, config]);
  }.bind(this));
};

var _findFiles = function(files, config) {
  var count = files.length;
  var foundFilesCount = 0;

  var onFile = function(file) {
    this.emit('file', file);
  }.bind(this);
  
  var onDone = function() {
    foundFilesCount++;   
    this.emit('done', foundFilesCount);
  }.bind(this);

  this.fswalker.walk(this.queryPath);

  this.fswalker.on('file', function(file) {
    var spec = new Spec(config);
    spec.satisfies(file, onFile);  
    if (--count === 0) { onDone(); }
  }.bind(this));
};

var _setPath = function(sPath) {
  return (sPath[sPath.length - 1] !== path.sep)? sPath + path.sep : sPath; 
};


exports.Query = Query;
