var fs     = require('fs'),
    path   = require('path'),
    gt     = require('../src/operators').gt,
    Query  = require('../src/query').Query;

/* TODO test them with spies */

describe('Query', function() {
  var query = null;

  beforeEach(function() {
    query = new Query('./assets');
  });

  it ('should find a file by filename', function(done) {		
    query.where({ filename : 'jordan'});

    query.on('file', function(file) {
      var filename = path.basename(file).replace(path.extname(file), '');
      filename.should.equal('jordan')
      done();
    })
  });

  it ('should find a file by extension', function(done) {
    query.where({ ext: '.png'});

    query.on('file', function(file) {
      path.extname(file).should.equal('.png')
      done();
    });
  });

  it ('should find a file by size', function(done) {
  	query.where({ size : 14730});

  	query.on('file', function(file) {
      var size = fs.statSync(file).size;
      size.should.equal(14730);
      done();
    });
  });

  it ('should find a file with size greater than 25000', function(done) {
  	query.where({ size : gt(50000)});

  	query.on('file', function(file) {
  		var size = fs.statSync(file).size;
  		size.should.greaterThan(50000); 
      done();
  	})
  });

  it ('should find a file by multiple a composite spec', function(done) {
    query.where({ filename : 'jordan', ext : '.png'});

    query.on('file', function(file) {    
      path.basename(file).should.equal('jordan.png');
      path.extname(file).should.equal('.png');
      done();            
    })
  });

  it ('should find a file at any deep level', function(done) {
    query.where({ filename : 'larry'});

    query.on('file', function(file) {
      var filename = path.basename(file).replace(path.extname(file), '');
      filename.should.equal('larry');
      done();
    })
  });
})