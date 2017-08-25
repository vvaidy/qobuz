'use strict';

const { hasValue } = require('../helpers');

const Track = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableFormats = ['5', '6', '7', '27'];
  this.availableIntents = ['stream', 'import', 'download'];
  this.client = client;
};

Track.prototype.get = function (trackId) {
  if (!hasValue(trackId)) {
    return Promise.reject('get() requires a track ID.');
  }

  return this.client.get('track/get', { track_id: trackId });
};

Track.prototype.getFileUrl = function (userAuthToken, trackId, formatId, intent) {
  if (!hasValue(trackId)) {
    return Promise.reject('getFileUrl() requires a track ID.');
  }

  if (hasValue(formatId) && !this.availableFormats.includes(formatId)) {
    return Promise.reject(`getFileUrl() format ID argument is invalid. Available format IDs are: ${this.availableFormats.join(', ')}.`);
  }

  if (hasValue(intent) && !this.availableIntents.includes(intent)) {
    return Promise.reject(`getFileUrl() intent argument is invalid. Available intents are: ${this.availableIntents.join(', ')}.`);
  }

  return this.client.getSigned('track/getFileUrl', { track_id: trackId, format_id: formatId, intent, user_auth_token: userAuthToken });
};

Track.prototype.search = function (query, limit, offset) {
  if (!hasValue(query)) {
    return Promise.reject('search() requires a query.');
  }

  return this.client.get('track/search', { query, limit, offset });
};

module.exports = Track;
