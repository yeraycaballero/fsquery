fs           = require('fs'),
path         = require('path'),
util         = require('util'),
EventEmitter = require('events').EventEmitter;

var FSWalker = function() {
  EventEmitter.call(this);
};

util.inherits(FSWalker, EventEmitter);

FSWalker.prototype.walk = function(directory) {
  var self = this;

  var walk = function(directory) {

    fs.readdir(directory, function(err, files) {
      if (err) throw err;

      var pending = files.length;
      var sPath   = (directory[directory.length - 1] !== path.sep)? directory + path.sep : directory; 
      
      files.forEach(function(filename) {
        var file = sPath + filename; 

        fs.lstat(file, function(err, stats) {
          if (err) throw err;

          if (stats.isFile()) {
            self.emit('file', file);            
            if (--pending == 0) self.emit('done');
          } 
          else if (stats.isDirectory) {            
            self.emit('dir', file);
            if (--pending == 0) self.emit('done');
            walk(file);
          }
        })
      })
    })
  }

  walk(directory);
};

exports.FSWalker = FSWalker;