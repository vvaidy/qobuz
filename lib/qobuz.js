'use strict';

const Qobuz = function (appId) {
  this.appId = appId || process.env.QOBUZ_APP_ID;

  if (typeof this.appId === 'undefined') {
    throw new Error('Client requires an application ID.');
  }
};

module.exports = Qobuz;
