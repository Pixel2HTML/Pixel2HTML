'use strict';

const create = require('./create');

module.exports = function (api, opts) {
  return create(api, opts, 'test');
};
