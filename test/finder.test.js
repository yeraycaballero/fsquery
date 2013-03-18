var fs     = require('fs'),
    path   = require('path'),
    should = require('should'),
    finder = require('../src/fsfinder');


describe('fsFinder', function() {
	var fsFinder = null;

	beforeEach(function() {
		fsFinder = new finder.fsFinder('./assets');		
	});

	it ('should find a file by filename', function(done) {
		fsFinder.on({ filename : 'jordan'}, function(err, res) {
		  if (err) done(err);

		  path.basename(res).should.equal('jordan.png');
		  done();
		});
	});

	it ('should find a file by extension', function(done) {
		fsFinder.on({ ext : '.png'}, function(err, res){
			if (err) done(err);

			path.extname(res).should.equal('.png');
			done();
		});
	});

  it ('should find a file by size', function(done) {
    fsFinder.on({size : 14730}, function(err, res) {
      if (err) done(err);
      var size = fs.statSync(res).size;

      size.should.equal(14730);
      done();
    })
  });

  it ('should find a file by mtime', function() {
  });

	it ('should find a file by multiple a composite spec', function(done) {
    fsFinder.on({filename : 'jordan', ext : '.png'}, function(err, res) {
      if (err) done(err);

      path.basename(res).should.equal('jordan.png');
      path.extname(res).should.equal('.png');
      done();
    })
	});
})