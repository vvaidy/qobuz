'use strict';

const { hasValue } = require('./helpers');

const Catalog = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableTypes = ['tracks', 'albums', 'artists', 'playlists'];
  this.client = client;
};

Catalog.prototype.autocomplete = function (query, limit, offset) {
  if (!hasValue(query)) {
    return Promise.reject('autocomplete() requires a query.');
  }

  return this.client.get('catalog/autocomplete', { query, limit, offset });
};

Catalog.prototype.count = function (query) {
  if (!hasValue(query)) {
    return Promise.reject('count() requires a query.');
  }

  return this.client.get('catalog/count', { query });
};

Catalog.prototype.search = function (query, type, limit, offset) {
  if (!hasValue(query)) {
    return Promise.reject('search() requires a query.');
  }

  if (type && !this.availableTypes.includes(type)) {
    return Promise.reject(`search() type argument is invalid. Available types are: ${this.availableTypes.join(', ')}.`);
  }

  return this.client.get('catalog/search', { query, type, limit, offset });
};

module.exports = Catalog;
