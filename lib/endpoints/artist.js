'use strict';

const { hasValue } = require('../helpers');

const Artist = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableExtras = ['albums'];
  this.client = client;
};

Artist.prototype.get = function (artistId, extra) {


  if (!hasValue(artistId)) {
    return Promise.reject('get() requires an artist ID.');
  }

  if (hasValue(extra) && !this.availableExtras.includes(extra)) {
    return Promise.reject(`get() extra argument is invalid. Available extras are: ${this.availableExtras.join(', ')}.`);
  }

  return this.client.get('artist/get', { artist_id: artistId, extra });
};

Artist.prototype.getSimilarArtists = function (artistId, limit, offset) {
  if (!hasValue(artistId)) {
    return Promise.reject('get() requires an artist ID.');
  }

  return this.client.get('artist/getSimilarArtists', { artist_id: artistId, limit, offset });
};

Artist.prototype.search = function (query, limit, offset) {
  if (!hasValue(query)) {
    return Promise.reject('search() requires a query.');
  }

  return this.client.get('artist/search', { query, limit, offset });
};

module.exports = Artist;
