'use strict';

const Label = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

module.exports = Label;
