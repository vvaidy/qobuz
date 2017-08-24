'use strict';

const crypto = require('crypto');

function user(client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  return {
    login: login
  };

  function login(username, password, deviceManufacturerId) {
    if (typeof username === 'undefined') {
      return Promise.reject('login() requires an username.');
    }

    if (typeof password === 'undefined') {
      return Promise.reject('login() requires a password.');
    }

    const passwordHash = crypto.createHash('md5').update(password).digest('hex');

    return client.get('user/login', { username, password: passwordHash, device_manufacturer_id: deviceManufacturerId });
  }
}

module.exports = user;
