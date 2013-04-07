var fs     = require('fs'),
    should = require('should'),
    attr  = require('../src/attributes');

describe('Attributes handler', function() {

  it ('should return the filename', function(done) {
    var file = '../assets/jordan.png';

    attr.filename(file, function(err, filename) {
      if (err) return done(err);
      filename.should.equal('jordan');
      done();
    })
  });

  it ('should return the extension', function(done) {
    var file = '../assets/jordan.png';

    attr.ext(file, function(err, ext) {
      if (err) return done(err);
      ext.should.equal('.png');
      done();
    })
  });

})


