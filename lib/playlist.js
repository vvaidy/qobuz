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

module.exports = Playlist;
