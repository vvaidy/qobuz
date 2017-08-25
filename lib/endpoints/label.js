'use strict';

const { hasValue } = require('../helpers');

const Label = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

Label.prototype.get = function (labelId) {
  if (!hasValue(labelId)) {
    return Promise.reject('get() requires a label ID.');
  }

  return this.client.get('label/get', { label_id: labelId });
};

Label.prototype.list = function (limit, offset) {
  return this.client.get('label/list', { limit, offset });
};

module.exports = Label;
