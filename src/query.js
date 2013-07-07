
var _       = require('lodash'),     
    fs      = require('fs'),
    util    = require('util'),
    path    = require('path'),
    events  = require('events'),
    Spec    = require('./spec').Spec,
    FSWalker = require('./fswalker').FSWalker;

var Query = function Query(sPath, context) {
  this.queryPath = path.resolve(sPath);
  this.context = context;
  this.fswalker  = new FSWalker();
  events.EventEmitter.call(this);
}

util.inherits(Query, events.EventEmitter);

Query.prototype.where = function(config) {
  var files = fs.readdirSync(this.queryPath);
  _findFiles.apply(this, [files, config]);
  return this;
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
    var spec = new Spec(config, this.context);
    spec.satisfies(file, onFile);
    if (--count === 0) { onDone(); }
  }.bind(this));

  this.fswalker.on('error', function() {
    this.emit('error', err);
  }.bind(this));
};

exports.Query = Query;
