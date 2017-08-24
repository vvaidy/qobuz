'use strict';

const Playlist = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

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

module.exports = Playlist;
