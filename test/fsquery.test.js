var fs     = require('fs'),
path   = require('path'),
should = require('should'),
gt     = require('../src/operators').gt,
FSQuery = require('../src/fsquery').FSQuery;


describe('fsQuery', function() {
  var fsQuery = null;

  beforeEach(function() {
   fsQuery = new FSQuery('./assets');
 })

  it ('should find a file by filename', function(done) {		
    fsQuery.where({ filename : 'jordan'});

    fsQuery.on('file', function(file) {
      var filename = path.basename(file).replace(path.extname(file), '');
      if (filename.should.equal('jordan')) done();
    })
  });

  it ('should find a file by extension', function(done) {
    fsQuery.where({ ext: '.png'});

    fsQuery.on('file', function(file) {
      if (path.extname(file).should.equal('.png')) done();
    });
  });

  it ('should find a file by size', function(done) {
  	fsQuery.where({ size : 14730});

  	fsQuery.on('file', function(file) {
      var size = fs.statSync(file).size;
      if (size.should.equal(14730)) done();
    });
  });

  it ('should find a file with size greater than 20000', function(done) {
  	fsQuery.where({ size : gt(20000)});

  	fsQuery.on('file', function(file) {
  		var size = fs.statSync(file).size;
  		if (size.should.greaterThan(20000)) done();
  	})
  });

  it ('should find a file by multiple a composite spec', function(done) {
    fsQuery.where({ filename : 'jordan', ext : '.png'});

    fsQuery.on('file', function(file) {
      if ( (path.basename(file).should.equal('jordan.png')) && path.extname(file).should.equal('.png') ) {
      	done();
      }      
    })
  })
})