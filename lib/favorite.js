'use strict';

const Favorite = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableTypes = ['tracks', 'albums', 'artists', 'articles'];
  this.client = client;
};

Favorite.prototype.create = function (userAuthToken, artistIds, albumIds, trackIds) {
  if (typeof userAuthToken === 'undefined') {
    return Promise.reject('create() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (artistIds && !Array.isArray(artistIds)) {
    return Promise.reject('create() artist IDs must be null or an array.');
  }

  if (albumIds && !Array.isArray(albumIds)) {
    return Promise.reject('create() album IDs must be null or an array.');
  }

  if (trackIds && !Array.isArray(trackIds)) {
    return Promise.reject('create() track IDs must be null or an array.');
  }

  if (typeof artistIds === 'undefined' && typeof albumIds === 'undefined' && typeof trackIds === 'undefined') {
    return Promise.reject('create() requires either artist IDs, album IDs, or track IDs.');
  }

  return this.client.get('favorite/create', { artist_ids: artistIds, album_ids: albumIds, track_ids: trackIds, user_auth_token: userAuthToken });
};

Favorite.prototype.delete = function (userAuthToken, artistIds, albumIds, trackIds) {
  if (typeof userAuthToken === 'undefined') {
    return Promise.reject('delete() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (artistIds && !Array.isArray(artistIds)) {
    return Promise.reject('delete() artist IDs must be null or an array.');
  }

  if (albumIds && !Array.isArray(albumIds)) {
    return Promise.reject('delete() album IDs must be null or an array.');
  }

  if (trackIds && !Array.isArray(trackIds)) {
    return Promise.reject('delete() track IDs must be null or an array.');
  }

  if (typeof artistIds === 'undefined' && typeof albumIds === 'undefined' && typeof trackIds === 'undefined') {
    return Promise.reject('delete() requires either artist IDs, album IDs, or track IDs.');
  }

  return this.client.get('favorite/delete', { artist_ids: artistIds, album_ids: albumIds, track_ids: trackIds, user_auth_token: userAuthToken });
};

Favorite.prototype.getUserFavorites = function (userAuthToken, userId, type, limit, offset) {
  if (typeof userAuthToken === 'undefined' && typeof userId === 'undefined') {
    return Promise.reject('getUserFavorites() requires either user auth token or user ID.');
  }

  if (type && !this.availableTypes.includes(type)) {
    return Promise.reject(`getUserFavorites() type argument is invalid. Available types are: ${this.availableTypes.join(', ')}.`);
  }

  return this.client.get('favorite/getUserFavorites', { user_id: userId, type, limit, offset, user_auth_token: userAuthToken });
};

module.exports = Favorite;
