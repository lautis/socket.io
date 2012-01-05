function toBuffer(string) {
  var utf8 = unescape(encodeURIComponent(string));
  var len = utf8.length;
  var buffer = new Buffer(utf8.length);
  while(len--) {
    buffer[len] = utf8.charCodeAt(len);
  }
  return buffer;
}

function fromBuffer(buffer) {
  var parts = [];
  var i, length = buffer.length;
  for (i = 0; i < length; i++) {
    parts.push(String.fromCharCode(buffer[i]));
  }
  return decodeURIComponent(escape(parts.join('')));
}

var benchmark = require('benchmark')
  , colors = require('colors')
  , io = require('../')
  , parser = io.parser
  , suite = new benchmark.Suite('String');

var buffer = new Buffer([0xF0, 0x9D, 0x9B, 0xA2]);
var string = "foo bar lol \ud835\udee2";

suite.add('new Buffer', function() {
  new Buffer(string)
});

suite.add('toBuffer', function () {
  var utf8 = unescape(encodeURIComponent(string));
  var len = utf8.length;
  var buffer = new Buffer(utf8.length);
  while(len--) {
    buffer[len] = utf8.charCodeAt(len);
  }
  return buffer;
});

suite.add('buffer.toString', function () {
  buffer.toString('utf8')
});

console.log(fromBuffer(buffer), fromBuffer(buffer).length, fromBuffer(buffer) == "\ud835\udee2")
console.log(toBuffer(string), buffer);

suite.add('fromBuffer', function () {
  var parts = [];
  var i, length = buffer.length;
  for (i = 0; i < length; i++) {
    parts.push(String.fromCharCode(buffer[i]));
  }
  return decodeURIComponent(escape(parts.join('')));
});

suite.on('cycle', function (bench, details) {
  console.log('\n' + suite.name.grey, details.name.white.bold);
  console.log([
      details.hz.toFixed(2).cyan + ' ops/sec'.grey
    , details.count.toString().white + ' times executed'.grey
    , 'benchmark took '.grey + details.times.elapsed.toString().white + ' sec.'.grey
    , 
  ].join(', '.grey));
});

if (!module.parent) {
  suite.run();
} else {
  module.exports = suite;
}
