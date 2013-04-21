var fs = require('fs'),
    fsquery = require('../src/fsquery');

describe('Attributes handler', function() {

  it ('should return the filename', function(done) {
    var file = './assets/jordan.png';
    var filenameHandler = fsquery.getAttributeHandler('filename');

    filenameHandler(file, function(err, filename) {
      if (err) return done(err);
      filename.should.equal('jordan');
      done();
    })
  });

  it ('should return the extension', function(done) {
    var file = './assets/jordan.png';
    var extHandler = fsquery.getAttributeHandler('ext');

    extHandler(file, function(err, ext) {
      if (err) return done(err);
      ext.should.equal('.png');
      done();
    })
  });

  it ('should return the size', function(done) {
    var file = './assets/jordan.png';
    var expectedSize = fs.statSync(file).size;    
    var sizeHandler  = fsquery.getAttributeHandler('size');

    sizeHandler(file, function(err, size) {
      if (err) return done(err);
      size.should.equal(expectedSize);
      done();
    })
  });


})


