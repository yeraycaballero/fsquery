fsquery
=======

*Declarative Filesystem query library that allow to find files by a specification*

Play time
-------------
find all css files in a directory

````javascript

var fsq = require('fsquery');
var ext  = fsq.operators.ext;

fsq.in('../assets')
  .where({ ext : 'css'})
  .on('file', function(file) {
    console.dir(file);
  })

````

find all log files in ./tmp greather than 1M
````javascript

var fsq = require('fsquery');
var ext  = fsq.operators.ext;
var size = fsq.attributes.size;

fsq.in('/server/logs')
  .where({ ext : '.log', size : gt('5M') );
  .on('file', function(file) {
    fs.unlink(file);
  })

````