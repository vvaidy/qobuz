'use strict';

const { hasValue } = require('../helpers');

const Track = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

Track.prototype.get = function (trackId) {
  if (!hasValue(trackId)) {
    return Promise.reject('get() requires a track ID.');
  }

  return this.client.get('track/get', { track_id: trackId });
};

module.exports = Track;
