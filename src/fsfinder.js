
var fs      = require('fs'),
    util    = require('util'),
    _       = require('lodash'),
    path    = require('path'),
    Spec    = require('./spec').Spec;


fsfinder = {};

fsfinder.fsFinder = function(sPath) {
  this.path = (sPath[sPath.length - 1] != path.sep)? sPath + path.sep : sPath;
}

fsfinder.fsFinder.prototype = {

  on : function(specConfig, callback) {
  	fs.readdir(this.path, function(err, files) {
  		if (err) throw err;
  		this._findFiles(files, specConfig, callback);
  	}.bind(this))
  },

  _findFiles : function(files, specConfig, callback) {
  	_(files).each(function(file) {
  		var metadata = this._getFileMetadata(this.path + file);
  		var spec = new Spec(specConfig);  		
  		if (spec.satisfies(metadata)) callback.apply(this, [null, this.path + file]);
  	}.bind(this));
  },

  _getFileMetadata : function(file) {
  	var ext      = path.extname(file);
  	var filename = path.basename(file, ext);
    var stat     = fs.statSync(file);

  	return {
  		filename : filename,
  		ext      : ext,
      size     : stat.size
  	}
  }
}

exports.fsFinder = fsfinder.fsFinder;