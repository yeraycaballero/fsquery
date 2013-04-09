
var _       = require('lodash'),     
    fs      = require('fs'),
    util    = require('util'),
    path    = require('path'),
    events  = require('events'),
    Spec    = require('./spec').Spec;


function FSQuery(sPath) {
  this.queryPath = _setPath.call(this, sPath);
}

util.inherits(FSQuery, events.EventEmitter);

FSQuery.prototype.where = function(config) {
  fs.readdir(this.queryPath, function(err, files) {
    if (err) { this.emit('error', err); }
    _findFiles.apply(this, [files, config]);  
  }.bind(this));
}

var _setPath = function(sPath) {
  return (sPath[sPath.length - 1] !== path.sep)? sPath + path.sep : sPath; 
};

var _findFiles = function(files, config) {
  var count = files.length;
  var foundFilesCount = 0;

  var onFile = function(file) {
    foundFilesCount++;   
    this.emit('file', file);
  }.bind(this);

  var onDone = function(count) {
    this.emit('done', foundFilesCount);
  }.bind(this);

  _.each(files, function(file) {
    var spec = new Spec(config);
    spec.satisfies(this.queryPath + file, onFile);  
    if (--count === 0) { onDone(); }
  }.bind(this))

};

exports.FSQuery = FSQuery;
