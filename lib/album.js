'use strict';

const Album = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableTypes = ['best-sellers', 'most-streamed', 'new-releases', 'press-awards', 'editor-picks', 'most-featured'];
  this.client = client;
};

Album.prototype.get = function (albumId) {
  if (typeof albumId === 'undefined') {
    return Promise.reject('get() requires an album ID.');
  }

  return this.client.get('album/get', { album_id: albumId });
};

Album.prototype.getFeatured = function (type, genreId, limit, offset) {

  if (type && !this.availableTypes.includes(type)) {
    return Promise.reject(`getFeatured() type argument is invalid. Available types are: ${this.availableTypes.join(', ')}.`);
  }

  return this.client.get('album/getFeatured', { type, genre_id: genreId, limit, offset });
};

Album.prototype.search = function (query, limit, offset) {
  if (typeof query === 'undefined') {
    return Promise.reject('search() requires a query.');
  }

  return this.client.get('album/search', { query, limit, offset });
};

module.exports = Album;
