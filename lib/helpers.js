'use strict';

function hasValue(arg) {
  return typeof arg !== 'undefined' && arg !== null;
}

module.exports = { hasValue };
