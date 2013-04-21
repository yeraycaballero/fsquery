var fs     = require('fs'),
    path   = require('path'),
// should = require('should'),
    gt     = require('../src/operators').gt,
    fsquery = require('../src/fsquery');

/* TODO think theses tests with stubs and spies */

describe('Query', function() {
  var query = null;

  beforeEach(function() {
    query = fsquery.in('./assets');
  });

  it ('should find a file by filename', function(done) {		
    query.where({ filename : 'jordan'});

    query.on('file', function(file) {
      var filename = path.basename(file).replace(path.extname(file), '');
      if (filename.should.equal('jordan')) done();
    })
  });

  it ('should find a file by extension', function(done) {
    query.where({ ext: '.png'});

    query.on('file', function(file) {
      if (path.extname(file).should.equal('.png')) done();
    });
  });

  it ('should find a file by size', function(done) {
  	query.where({ size : 14730});

  	query.on('file', function(file) {
      var size = fs.statSync(file).size;
      if (size.should.equal(14730)) done();
    });
  });

  it ('should find a file with size greater than 20000', function(done) {
  	query.where({ size : gt(20000)});

  	query.on('file', function(file) {
  		var size = fs.statSync(file).size;
  		if (size.should.greaterThan(20000)) done();
  	})
  });

  it ('should find a file by multiple a composite spec', function(done) {
    query.where({ filename : 'jordan', ext : '.png'});

    query.on('file', function(file) {
      if ( (path.basename(file).should.equal('jordan.png')) && path.extname(file).should.equal('.png') ) {
      	done();
      }      
    })
  });

  // it ('should find a file at any deep level', function(done) {
  //   query.where({ filename : 'larry'});

  //   query.on('file', function(file) {
  //     var filename = path.basename(file).replace(path.extname(file), '');
  //     if (filename.should.equal('jordan')) done();
  //   })
  // });
})