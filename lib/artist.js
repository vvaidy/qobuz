'use strict';

function artist(client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  const availableExtras = ['albums'];

  return {
    get: get,
    getSimilarArtists: getSimilarArtists,
    search: search
  };

  function get(artistId, extra) {
    if (typeof artistId === 'undefined') {
      return Promise.reject('get() requires an artist ID.');
    }

    if (extra && !availableExtras.includes(extra)) {
      return Promise.reject(`get() extra argument is invalid. Available extras are: ${availableExtras.join(', ')}.`);
    }

    return client.get('artist/get', { artist_id: artistId, extra });
  }

  function getSimilarArtists(artistId, limit, offset) {
    if (typeof artistId === 'undefined') {
      return Promise.reject('get() requires an artist ID.');
    }

    return client.get('artist/getSimilarArtists', { artist_id: artistId, limit, offset });
  }

  function search(query, limit, offset) {
    if (typeof query === 'undefined') {
      return Promise.reject('search() requires a query.');
    }

    return client.get('artist/search', { query, limit, offset });
  }
}

module.exports = artist;
