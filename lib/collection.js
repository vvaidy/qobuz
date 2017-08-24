'use strict';

function collection(client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  const availableSources = ['playlists', 'purchases', 'favorites'];

  return {
    getAlbums: getAlbums
  };

  function getAlbums(userAuthToken, source, artistId, query, limit, offset) {
    if (typeof userAuthToken === 'undefined') {
      return Promise.reject('getAlbums() requires an user auth token. You should use the user.login() method to get one.');
    }

    if (source && !availableSources.includes(source)) {
      return Promise.reject(`getAlbums() source argument is invalid. Available sources are: ${availableSources.join(', ')}.`);
    }

    return client.get('collection/getAlbums', { source, artist_id: artistId, query, limit, offset, user_auth_token: userAuthToken });
  }
}

module.exports = collection;
