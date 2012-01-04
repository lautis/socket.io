
/*!
* socket.io-node
* Copyright(c) 2011 LearnBoost <dev@learnboost.com>
* MIT Licensed
*/

/**
 * Test dependencies.
 */

var should = require('./common')
  , Unicode = require('../lib/util').Unicode;
require('./hybi-common');

/**
 * Test.
 */

module.exports = {

  'test that characters in Basic Multilingual Plane are encoded correctly': function (done) {
    Unicode.surrogatePairs = true;
    Unicode.encode("hëllo wörld").toString('utf8').should.equal('hëllo wörld');
    Unicode.surrogatePairs = false;
    Unicode.encode("hëllo wörld").toString('utf8').should.equal('hëllo wörld');
    done();
  },
  'test that characters outside Basic Multilingual Plane are encoded correctly': function (done) {
    Unicode.surrogatePairs = true;
    var encoded = Unicode.encode("\ud835\udee2");
    getHexStringFromBuffer(encoded).should.equal('f0 9d 9b a2');
    done();
  },
  'test that characters in Basic Multilingual Plane are decoded correctly': function (done) {
    Unicode.surrogatePairs = true;
    Unicode.decode(new Buffer("hëllo wörld")).should.equal('hëllo wörld');
    Unicode.surrogatePairs = false;
    Unicode.decode(new Buffer("hëllo wörld")).should.equal('hëllo wörld');
    done();
  },
  'test that characters outside Basic Multilingual Plane are decoded correctly': function (done) {
    Unicode.surrogatePairs = true;
    var decoded = Unicode.decode(getBufferFromHexString('f0 9d 9b a2'));
    decoded.should.equal("\ud835\udee2");
    done();
  }

};
