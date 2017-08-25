'use strict';

const crypto = require('crypto');
const { hasValue } = require('../helpers');

const User = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

User.prototype.login = function (username, password, deviceManufacturerId) {
  if (!hasValue(username)) {
    return Promise.reject('login() requires an username.');
  }

  if (!hasValue(password)) {
    return Promise.reject('login() requires a password.');
  }

  const passwordHash = crypto.createHash('md5').update(password).digest('hex');

  return this.client.get('user/login', { username, password: passwordHash, device_manufacturer_id: deviceManufacturerId });
};

User.prototype.resetPassword = function (username, email) {
  if (!hasValue(username) && !hasValue(email)) {
    return Promise.reject('login() requires an username or an email.');
  }

  return this.client.get('user/resetPassword', { username, email });
};

module.exports = User;
