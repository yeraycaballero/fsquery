var FSWalker = require('../src/fswalker').FSWalker

describe('FSWalker', function() {
  var fsWalker = null;

  beforeEach(function() {
    fsWalker = new FSWalker();
  });

  it ('should emit a file event when a file is found', function(done) {
    var spy = sinon.spy();

    fsWalker = new FSWalker();
    fsWalker.on('file', spy);
    fsWalker.walk('./assets');

    spy.called.should.equal.true;
    done();
  });

  it ('should emit a dir event when a directory is found', function(done) {
      var spy = sinon.spy();

      fsWalker.on('dir', spy);
      fsWalker.walk('./assets');

      spy.called.should.equal.true;
      done();
  });

  it ('should emit a done event when it ends', function(done) {
      var spy = sinon.spy();

      fsWalker.on('done', spy);
      fsWalker.walk('./assets');

      spy.called.should.equal.true;
      done();
  })

});
