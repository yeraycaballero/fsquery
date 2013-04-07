// Operators


exports.gt = function(value) {
  return function() {
    return this > value;
  }
};

exports.lt = function(value) {
  return function() {
    return this < value;
  }
};

exports.eq = function(value) {
  return function() {
    return this == value;
  }
}

// exports.regexp
// exports.all
// exports.all.except
