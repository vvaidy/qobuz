'use strict';

const Comment = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableCommentableTypes = ['album', 'article', 'blog'];
  this.client = client;
};

Comment.prototype.count = function (commentableType, commentableId) {
  if (typeof commentableType === 'undefined') {
    return Promise.reject('count() requires a commentable type.');
  }

  if (!this.availableCommentableTypes.includes(commentableType)) {
    return Promise.reject(`count() commentable type argument is invalid. Available commentable types are: ${this.availableCommentableTypes.join(', ')}.`);
  }

  if (typeof commentableId === 'undefined') {
    return Promise.reject('count() requires a commentable ID.');
  }

  return this.client.get('comment/count', { commentable_type: commentableType, commentable_id: commentableId });
};

Comment.prototype.create = function (userAuthToken, commentableType, commentableId, content) {
  if (typeof userAuthToken === 'undefined') {
    return Promise.reject('create() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (typeof commentableType === 'undefined') {
    return Promise.reject('create() requires a commentable type.');
  }

  if (!this.availableCommentableTypes.includes(commentableType)) {
    return Promise.reject(`create() commentable type argument is invalid. Available commentable types are: ${this.availableCommentableTypes.join(', ')}.`);
  }

  if (typeof commentableId === 'undefined') {
    return Promise.reject('create() requires a commentable ID.');
  }

  if (typeof content === 'undefined') {
    return Promise.reject('create() requires a content.');
  }

  return this.client.get('comment/create', { commentable_type: commentableType, commentable_id: commentableId, content, user_auth_token: userAuthToken });
};

module.exports = Comment;