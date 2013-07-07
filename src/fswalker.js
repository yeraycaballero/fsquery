fs           = require('fs'),
path         = require('path'),
util         = require('util'),
EventEmitter = require('events').EventEmitter

var FSWalker = function() {
  EventEmitter.call(this);
}

util.inherits(FSWalker, EventEmitter);


FSWalker.prototype.walk = function(directory) {
  var self = this;

  var walk = function(directory) {

    fs.readdir(directory, function(err, files) {
      if (err) self.emit('error', err);

      var pending = files.length
      var sPath = path.resolve(directory);

      files.forEach(function(filename) {
        var file = sPath + path.sep + filename

        fs.lstat(file, function(err, stats) {
          if (err) self.emit('error', err);

          if (stats.isFile()) {
            self.emit('file', file)     
            if (--pending == 0) self.emit('done');
          } 
          else if (stats.isDirectory) {            
            self.emit('dir', file)
            if (--pending == 0) self.emit('done')
            walk(file)
          }
        })
      })
    })
  }

  walk(directory);
}

exports.FSWalker = FSWalker