'use strict';

const Status = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

module.exports = Status;
