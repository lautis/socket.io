
/*!
 * socket.io-node
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module requirements.
 */

var HTTPPolling = require('./http-polling');
var util = require('../util');

/**
 * Export the constructor.
 */

exports = module.exports = JSONPPolling;

/**
 * JSON-P polling transport.
 *
 * @api public
 */

function JSONPPolling (mng, data, req) {
  HTTPPolling.call(this, mng, data, req);

  this.head = 'io.j[0](';
  this.foot = ');';

  if (data.query.i) {
    this.head = 'io.j[' + data.query.i + '](';
  }
};

/**
 * Inherits from Transport.
 */

JSONPPolling.prototype.__proto__ = HTTPPolling.prototype;

/**
 * Transport name
 *
 * @api public
 */

JSONPPolling.prototype.name = 'jsonppolling';

/**
 * Make sure POST are decoded.
 */

JSONPPolling.prototype.postEncoded = true;

/**
 * Handles incoming data.
 * Due to a bug in \n handling by browsers, we expect a JSONified string.
 *
 * @api private
 */

JSONPPolling.prototype.onData = function (data) {
  try {
    data = JSON.parse(data);
  } catch (e) {
    this.error('parse', 'reconnect');
    return;
  }

  HTTPPolling.prototype.onData.call(this, data);
};

/**
 * Performs the write.
 *
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data) {
  HTTPPolling.prototype.doWrite.call(this);

  var data = data === undefined
      ? '' : this.head + JSON.stringify(data) + this.foot;
  var buffer = util.Unicode.encode(data);

  this.response.writeHead(200, {
      'Content-Type': 'text/javascript; charset=UTF-8'
    , 'Content-Length': buffer.length
    , 'Connection': 'Keep-Alive'
    , 'X-XSS-Protection': '0'
  });

  this.response.write(buffer);
  this.log.debug(this.name + ' writing', data);
};
