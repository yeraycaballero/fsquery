var quantity = require('../src/quantity');

describe('Quantity', function() {
  
  describe('Combinations of characteres', function() {
    it ('1kb,1K,1 KB, 1kb should be equal to 1024', function() {
      quantity.toBytes('1kb').should.be.equal(1024);
      quantity.toBytes('1K').should.be.equal(1024);
      quantity.toBytes('1 kb').should.be.equal(1024);
      quantity.toBytes('1 KB').should.be.equal(1024);
      quantity.toBytes('1  KB').should.be.equal(1024);
    });
  });

  describe('Units', function() {
    it ('2 KB should be equal to 2048', function() {    
      quantity.toBytes('2 KB').should.be.equal(2048);
    });

    it ('0 KB should be equal to 0', function() {    
      quantity.toBytes('0 KB').should.be.equal(0);
    })

    it ('1 MB should be equal to 1024 * 1024', function() {    
      quantity.toBytes('1 MB').should.be.equal(1024 * 1024);
    });

    it ('1 GB should be equal to 1024 * 1024 * 1024', function() {    
      quantity.toBytes('1 GB').should.be.equal(1024 * 1024 * 1024);
    });

    it ('1 TB should be equal to 1024 * 1024 * 1024 * 1024', function() {    
      quantity.toBytes('1 TB').should.be.equal(1024 * 1024 * 1024 * 1024);
    });

    it ('1 PB should be equal to 1024 * 1024 * 1024 * 1024 * 1024', function() {    
      quantity.toBytes('1 PB').should.be.equal(1024 * 1024 * 1024 * 1024 * 1024);
    });

    it ('1 EB should be equal to 1024 * 1024 * 1024 * 1024 * 1024 * 1024', function() {    
      quantity.toBytes('1 EB').should.be.equal(1024 * 1024 * 1024 * 1024 * 1024 * 1024);
    });
  });

  describe('Quantities without unit', function() {
    it ('should return number when is just passed a number', function() {
      quantity.toBytes('1').should.to.be.equal(1);
    })
  });

});