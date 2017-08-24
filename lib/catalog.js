'use strict';

function catalog(client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  return {
    autocomplete: autocomplete
  };

  function autocomplete(query, limit, offset) {
    if (typeof query === 'undefined') {
      return Promise.reject('autocomplete() requires a query.');
    }

    return client.get('catalog/autocomplete', { query, limit, offset });
  }
}

module.exports = catalog;
