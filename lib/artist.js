'use strict';

function artist (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  const availableExtras = ['albums'];

  return {
    get: get
  };

  function get (artistId, extra) {
    if (typeof artistId === 'undefined') {
      return Promise.reject('get() requires an artist ID.');
    }

    if (extra && !availableExtras.includes(extra)) {
      return Promise.reject(`get() extra argument is invalid. Available extras are: ${availableExtras.join(', ')}.`);
    }

    return client.get('artist/get', { artist_id: artistId, extra });
  }
}

module.exports = artist;
