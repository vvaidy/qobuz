'use strict';

const { hasValue } = require('./helpers');

const Purchase = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

Purchase.prototype.getArticles = function (albumId, trackId) {
  if (!hasValue(albumId) && !hasValue(trackId)) {
    return Promise.reject('getArticles() requires either an album ID or a track ID.');
  }

  return this.client.get('purchase/getArticles', { album_id: albumId, track_id: trackId });
};

module.exports = Purchase;
