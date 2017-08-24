'use strict';

function catalog(client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  return {
    autocomplete: autocomplete,
    count: count
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
}

module.exports = catalog;
