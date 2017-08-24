'use strict';

function album (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  const availableTypes = ['best-sellers', 'most-streamed', 'new-releases', 'press-awards', 'editor-picks', 'most-featured'];

  return {
    get: get,
    getFeatured: getFeatured
  };

  function get (albumId) {
    if (typeof albumId === 'undefined') {
      return Promise.reject('getAlbum() requires an album ID.');
    }

    return client.get('album/get', { album_id: albumId });
  }

  function getFeatured (type, genreId, limit, offset) {
    if (type && !availableTypes.includes(type)) {
      return Promise.reject(`getFeatured() type argument is invalid. Available types are ${availableTypes.join(', ')}.`);
    }

    return client.get('album/getFeatured', { type, genre_id: genreId, limit, offset });
  }
}

module.exports = album;
