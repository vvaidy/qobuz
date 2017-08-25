'use strict';

const { hasValue } = require('../helpers');

const Purchase = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

Purchase.prototype.getArticles = function (albumId, trackId) {
  if (!hasValue(albumId) && !hasValue(trackId)) {
    return Promise.reject('getArticles() requires either an album ID or a track ID.');
  }

  return this.client.get('purchase/getArticles', { album_id: albumId, track_id: trackId });
};

Purchase.prototype.getUserPurchases = function (userAuthToken, orderId, orderLineId, flat, limit, offset) {
  if (!hasValue(userAuthToken)) {
    return Promise.reject('getUserPurchases() requires an user auth token. You should use the user.login() method to get one.');
  }

  const parameters = { order_id: orderId, order_line_id: orderLineId };

  if (hasValue(flat)) {
    parameters['flat'] = flat ? '1' : '0';
  }

  parameters['limit'] = limit;
  parameters['offset'] = offset;
  parameters['user_auth_token'] = userAuthToken;

  return this.client.get('purchase/getUserPurchases', parameters);
};

Purchase.prototype.getUserPurchasesIds = function (userAuthToken, limit, offset) {
  if (!hasValue(userAuthToken)) {
    return Promise.reject('getUserPurchasesIds() requires an user auth token. You should use the user.login() method to get one.');
  }

  return this.client.get('purchase/getUserPurchasesIds', { limit, offset, user_auth_token: userAuthToken });
};

module.exports = Purchase;
