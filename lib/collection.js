'use strict';

const { hasValue } = require('./helpers');

const Collection = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableSources = ['playlists', 'purchases', 'favorites'];
  this.client = client;
};

Collection.prototype.getAlbums = function (userAuthToken, source, artistId, query, limit, offset) {
  if (!hasValue(userAuthToken)) {
    return Promise.reject('getAlbums() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (source && !this.availableSources.includes(source)) {
    return Promise.reject(`getAlbums() source argument is invalid. Available sources are: ${this.availableSources.join(', ')}.`);
  }

  return this.client.get('collection/getAlbums', { source, artist_id: artistId, query, limit, offset, user_auth_token: userAuthToken });
};

Collection.prototype.getArtists = function (userAuthToken, source, query, limit, offset) {
  if (!hasValue(userAuthToken)) {
    return Promise.reject('getArtists() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (source && !this.availableSources.includes(source)) {
    return Promise.reject(`getArtists() source argument is invalid. Available sources are: ${this.availableSources.join(', ')}.`);
  }

  return this.client.get('collection/getArtists', { source, query, limit, offset, user_auth_token: userAuthToken });
};

Collection.prototype.getTracks = function (userAuthToken, source, artistId, albumId, query, limit, offset) {
  if (!hasValue(userAuthToken)) {
    return Promise.reject('getTracks() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (source && !this.availableSources.includes(source)) {
    return Promise.reject(`getTracks() source argument is invalid. Available sources are: ${this.availableSources.join(', ')}.`);
  }

  return this.client.get('collection/getTracks', { source, artist_id: artistId, albumd_id: albumId, query, limit, offset, user_auth_token: userAuthToken });
};

module.exports = Collection;
