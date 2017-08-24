'use strict';

require('./polyfills');

const request = require('request');
const album = require('./album');
const article = require('./article');
const artist = require('./artist');
const catalog = require('./catalog');
const endpoint = 'http://www.qobuz.com/api.json/0.2/';

const Qobuz = function (appId) {
  this.appId = appId || process.env.QOBUZ_APP_ID;

  if (typeof this.appId === 'undefined') {
    throw new Error('Client requires an application ID.');
  }

  this.album = new album(this);
  this.article = new article(this);
  this.artist = new artist(this);
  this.catalog = new catalog(this);
};

Qobuz.prototype.get = function (uri, parameters) {
  const merged = Object.assign({ app_id: this.appId }, parameters);
  const options = {
    uri: `${endpoint}${uri}?${buildQuerystring(merged)}`,
    json: true
  };

  return new Promise((resolve, reject) => {
    request.get(options, (error, response, body) => {
      if (error) reject(error);
      else resolve(body);
    });
  });
};

function buildQuerystring(query) {
  return Object
    .keys(query)
    .filter(key => query[key] || query[key] === 0 || query[key] === false)
    .map(key => encodeURI(key) + '=' + encodeURI(query[key]))
    .join('&');
}

module.exports = Qobuz;
