'use strict';

const Status = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

Status.prototype.test = function () {
  return this.client.get('status/test');
},

  module.exports = Status;
