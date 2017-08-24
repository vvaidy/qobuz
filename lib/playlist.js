'use strict';

const Playlist = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableExtras = ['tracks'];
  this.availableTypes = ['last-created', 'editor-picks'];
  this.client = client;
};

Playlist.prototype.addTracks = function (userAuthToken, playlistId, trackIds) {
  if (typeof playlistId === 'undefined') {
    return Promise.reject('addTracks() requires a playlist ID.');
  }

  if (trackIds && !Array.isArray(trackIds)) {
    return Promise.reject('addTracks() track IDs must be null or an array.');
  }

  return this.client.get('playlist/addTracks', { playlist_id: playlistId, track_ids: trackIds, user_auth_token: userAuthToken });
};

Playlist.prototype.create = function (userAuthToken, name, description, isPublic, isCollaborative, trackIds, albumId) {
  if (typeof userAuthToken === 'undefined') {
    return Promise.reject('create() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (typeof name === 'undefined') {
    return Promise.reject('create() requires a name.');
  }

  if (trackIds && !Array.isArray(trackIds)) {
    return Promise.reject('addTracks() track IDs must be null or an array.');
  }

  return this.client.get('playlist/create', { name, description, is_public: isPublic ? '1' : '0', is_collaborative: isCollaborative ? '1' : '0', track_ids: trackIds, album_id: albumId, user_auth_token: userAuthToken });
};

Playlist.prototype.delete = function (userAuthToken, playlistId) {
  if (typeof userAuthToken === 'undefined') {
    return Promise.reject('delete() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (typeof playlistId === 'undefined') {
    return Promise.reject('delete() requires a playlist ID.');
  }

  return this.client.get('playlist/delete', { playlist_id: playlistId, user_auth_token: userAuthToken });
};

Playlist.prototype.deleteTracks = function (userAuthToken, playlistId, playlistTrackIds) {
  if (typeof userAuthToken === 'undefined') {
    return Promise.reject('deleteTracks() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (typeof playlistId === 'undefined') {
    return Promise.reject('deleteTracks() requires a playlist ID.');
  }

  if (typeof playlistTrackIds === 'undefined') {
    return Promise.reject('deleteTracks() requires a playlist track IDs.');
  }

  if (!Array.isArray(playlistTrackIds)) {
    return Promise.reject('deleteTracks() playlist track IDs must be an array.');
  }

  return this.client.get('playlist/deleteTracks', { playlist_id: playlistId, playlist_track_ids: playlistTrackIds, user_auth_token: userAuthToken });
};

Playlist.prototype.get = function (userAuthToken, playlistId, extra, limit, offset) {
  if (typeof playlistId === 'undefined') {
    return Promise.reject('get() requires a playlist ID.');
  }

  if (extra && !this.availableExtras.includes(extra)) {
    return Promise.reject(`get() extra argument is invalid. Available extras are: ${this.availableExtras.join(', ')}.`);
  }

  return this.client.get('playlist/get', { playlist_id: playlistId, extra, limit, offset, user_auth_token: userAuthToken });
};

Playlist.prototype.getFeatured = function (type, genreIds, limit, offset) {
  if (typeof type === 'undefined') {
    return Promise.reject('getFeatured() requires a type.');
  }

  if (!this.availableTypes.includes(type)) {
    return Promise.reject(`getFeatured() type argument is invalid. Available types are: ${this.availableTypes.join(', ')}.`);
  }

  const parameters = { type };

  if (!Array.isArray(genreIds)) {
    parameters['genre_id'] = genreIds;
  }
  else {
    parameters['genre_ids'] = genreIds;
  }

  parameters['limit'] = limit;
  parameters['offset'] = offset;

  return this.client.get('playlist/getFeatured', parameters);
};

Playlist.prototype.getUserPlaylists = function (userAuthToken, userId, username, order, limit, offset) {
  return this.client.get('playlist/getUserPlaylists', { user_id: userId, username, order, limit, offset, user_auth_token: userAuthToken });
};

Playlist.prototype.search = function (query, limit, offset) {
  if (typeof query === 'undefined') {
    return Promise.reject('search() requires a query.');
  }

  return this.client.get('playlist/search', { query, limit, offset });
};

Playlist.prototype.subscribe = function (userAuthToken, playlistId) {
  if (typeof userAuthToken === 'undefined') {
    return Promise.reject('subscribe() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (typeof playlistId === 'undefined') {
    return Promise.reject('subscribe() requires a playlist ID.');
  }

  return this.client.get('playlist/subscribe', { playlist_id: playlistId, user_auth_token: userAuthToken });
};

Playlist.prototype.unsubscribe = function (userAuthToken, playlistId) {
  if (typeof userAuthToken === 'undefined') {
    return Promise.reject('unsubscribe() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (typeof playlistId === 'undefined') {
    return Promise.reject('unsubscribe() requires a playlist ID.');
  }

  return this.client.get('playlist/unsubscribe', { playlist_id: playlistId, user_auth_token: userAuthToken });
};

module.exports = Playlist;
