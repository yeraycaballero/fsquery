var fs = require('fs'),
    attr = require('../src/attributes');

describe('Attributes handler', function() {

  it ('should return the filename', function(done) {
    var file = './assets/jordan.png';
    var filenameHandler = attr['filename'];

    filenameHandler(file, function(err, filename) {
      if (err) return done(err);
      filename.should.equal('jordan');
      done();
    })
  });

  it ('should return the extension', function(done) {
    var file = './assets/jordan.png';
    var extHandler = attr['ext'];

    extHandler(file, function(err, ext) {
      if (err) return done(err);
      ext.should.equal('.png');
      done();
    })
  });

  it ('should return the size', function(done) {
    var file = './assets/jordan.png';
    var expectedSize = fs.statSync(file).size;    
    var sizeHandler  = attr['size'];

    sizeHandler(file, function(err, size) {
      if (err) return done(err);
      size.should.equal(expectedSize);
      done();
    })
  });


})


