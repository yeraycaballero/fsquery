
var path    = require('path'),
    fsquery = require('../src/fsquery');

describe('fsquery', function() {

  it ('should return a query object when the in method is called', function() {
    var query = fsquery.in('../assets');
    query.should.be.an.instanceOf(Object);
  });

  it ('should register an attribute handler', function() {
    var handler = function() {};

    fsquery.in('../assets');
    fsquery.reg('attribute', 'text', handler);

    handler.should.be.equal(fsquery.get('attribute', 'text'));
  });

  it ('should register an operator', function() {
    var operator = function() {};

    fsquery.in('../assets');
    fsquery.reg('operator', 'op', operator);

    operator.should.be.equal(fsquery.get('operator', 'op'));
  });

  it ('should return all jpg files inside a folder', function(done) {
    var ext = fsquery.attributes.ext;
    var count = 0;

    fsquery.in('./assets/level1')
      .where({ ext : '.jpg'})
      .on('file', function(file) {
        path.extname(file).should.equal('.jpg');
        count++;
      })
      .on('done', function() {
        if (count == 2) done();
      })
  });

});
