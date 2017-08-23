'use strict';

const album = require('./album');

const Qobuz = function (appId) {
  this.appId = appId || process.env.QOBUZ_APP_ID;

  if (typeof this.appId === 'undefined') {
    throw new Error('Client requires an application ID.');
  }

  this.album = album(this);
};

module.exports = Qobuz;
