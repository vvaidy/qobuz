'use strict';

const Genre = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

Genre.prototype.get = function (genreId) {
  if (typeof genreId === 'undefined') {
    return Promise.reject('get() requires a genre ID.');
  }

  return this.client.get('genre/get', { genre_id: genreId });
};

Genre.prototype.list = function (parentId, limit, offset) {
  return this.client.get('genre/list', { parent_id: parentId, limit, offset });
};

module.exports = Genre;
