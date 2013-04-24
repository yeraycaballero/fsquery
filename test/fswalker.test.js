var FSWalker = require('../src/fswalker').FSWalker;

describe('fswalker', function() {
  var fswalker = null;
  var listener = null;

  beforeEach(function() {
     listener = sinon.spy(FSWalker.prototype, 'emit');
     fswalker = new FSWalker();
  });

  afterEach(function() {
     listener.restore();
     fswalker = null;
  });

  it ('shoud emit a file event when a file is found', function(done) {     
     fswalker.on('file', listener);
     fswalker.walk('./assets');
     
     listener.should.have.been.called;
     done();
  });

  it ('shoud emit a dir event when a directory is found', function(done) {     
     fswalker.on('dir', listener);   
     fswalker.walk('./assets');  
    
     listener.should.have.been.called;
     done();
  });

  it ('shoud emit a done event when it ends', function(done) {     
     fswalker.on('done', listener);   
     fswalker.walk('./assets');  
    
     listener.should.have.been.called;
     done();     
  });

})
