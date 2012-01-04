
/*!
 * socket.io-node
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

/**
 * Converts an enumerable to an array.
 *
 * @api public
 */

exports.toArray = function (enu) {
  var arr = [];

  for (var i = 0, l = enu.length; i < l; i++)
    arr.push(enu[i]);

  return arr;
};

/**
 * Unpacks a buffer to a number.
 *
 * @api public
 */

exports.unpack = function (buffer) {
  var n = 0;
  for (var i = 0; i < buffer.length; ++i) {
    n = (i == 0) ? buffer[i] : (n * 256) + buffer[i];
  }
  return n;
}

/**
 * Left pads a string.
 *
 * @api public
 */

exports.padl = function (s,n,c) { 
  return new Array(1 + n - s.length).join(c) + s;
}

exports.Unicode = {
  surrogatePairs: false
};


/**
 * Encode JS string to UTF-8 buffer
 *
 * @api public
 * @param {Buffer}
 * @return {String}
 */

exports.Unicode.encode = function(string) {
  if (exports.Unicode.surrogatePairs) {
    var utf8 = unescape(encodeURIComponent(string));
    var len = utf8.length;
    var buffer = new Buffer(utf8.length);
    while(len--) {
      buffer[len] = utf8.charCodeAt(len);
    }
    return buffer;
  } else {
    return new Buffer(string);
  }
}

/**
 * Decode JS string from Buffer
 *
 * @api public
 * @param {String}
 * @return {Buffer}
 */

exports.Unicode.decode = function(buffer) {
  if (exports.Unicode.surrogatePairs) {
    var parts = [];
    var i, length = buffer.length;
    for (i = 0; i < length; i++) {
      parts.push(String.fromCharCode(buffer[i]));
    }
    return decodeURIComponent(escape(parts.join('')));
  } else {
    return buffer.toString('utf8');
  }

}

