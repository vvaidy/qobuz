'use strict';

function catalog(client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  const availableTypes = ['tracks', 'albums', 'artists', 'playlists'];

  return {
    autocomplete: autocomplete,
    count: count,
    search: search
  };

  function autocomplete(query, limit, offset) {
    if (typeof query === 'undefined') {
      return Promise.reject('autocomplete() requires a query.');
    }

    return client.get('catalog/autocomplete', { query, limit, offset });
  }

  function count(query) {
    if (typeof query === 'undefined') {
      return Promise.reject('count() requires a query.');
    }

    return client.get('catalog/count', { query });
  }

  function search(query, type, limit, offset) {
    if (typeof query === 'undefined') {
      return Promise.reject('search() requires a query.');
    }

    if (type && !availableTypes.includes(type)) {
      return Promise.reject(`search() type argument is invalid. Available types are: ${availableTypes.join(', ')}.`);
    }

    return client.get('catalog/search', { query, type, limit, offset });
  }
}

module.exports = catalog;
