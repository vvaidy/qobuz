'use strict';

const crypto = require('crypto');
const { hasValue } = require('./helpers');

require('./polyfills');

const request = require('request');
const {
  Album,
  Article,
  Artist,
  Catalog,
  Collection,
  Comment,
  Favorite,
  Genre,
  Label,
  Playlist,
  Purchase,
  Status,
  Track,
  User
} = require('./endpoints');
const endpoint = 'http://www.qobuz.com/api.json/0.2/';

const Qobuz = function (appId, appSecret) {
  this.appId = appId || process.env.QOBUZ_APP_ID;
  this.appSecret = appSecret;

  if (typeof this.appId === 'undefined') {
    throw new Error('Client requires an application ID.');
  }

  this.album = new Album(this);
  this.article = new Article(this);
  this.artist = new Artist(this);
  this.catalog = new Catalog(this);
  this.collection = new Collection(this);
  this.comment = new Comment(this);
  this.favorite = new Favorite(this);
  this.genre = new Genre(this);
  this.label = new Label(this);
  this.playlist = new Playlist(this);
  this.purchase = new Purchase(this);
  this.status = new Status(this);
  this.track = new Track(this);
  this.user = new User(this);
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
      else if (response.statusCode !== 200) reject(new Error(body.message))
      else resolve(body);
    });
  });
};

Qobuz.prototype.getSigned = function (uri, parameters) {
  const objectAndMethod = uri.replace(/\W+/g, '');
  const sortedParameters = buildSortedParameters(parameters);
  const requestTs = Math.floor(new Date() / 1000);
  const result = `${objectAndMethod}${sortedParameters}${requestTs}${this.appSecret}`;
  const requestSig = crypto.createHash('md5').update(result).digest('hex');
  const merged = Object.assign({ request_ts: requestTs, request_sig: requestSig }, parameters);

  return this.get(uri, merged);
};

function buildQuerystring(parameters) {
  return Object
    .keys(parameters)
    .filter(key => hasValue(parameters[key]))
    .map(key => encodeURI(key) + '=' + encodeURI(parameters[key]))
    .join('&');
}

function buildSortedParameters(parameters) {
  return Object
    .keys(parameters)
    .sort(alphabetically)
    .filter(key => hasValue(parameters[key]) && key !== 'user_auth_token')
    .map(key => `${key}${parameters[key]}`)
    .join('');
}

function alphabetically(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

module.exports = Qobuz;
