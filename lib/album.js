'use strict';

function album (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  return {
    get: get
  };

  function get (albumId) {
    if (typeof albumId === 'undefined') {
      return Promise.reject('getAlbum() requires an album ID.');
    }

    return client.get('album/get', { album_id: albumId });
  }
}

module.exports = album;
