'use strict';

const { hasValue } = require('../helpers');

const Comment = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.availableCommentableTypes = ['album', 'article', 'blog'];
  this.availableFlags = ['abuse'];
  this.client = client;
};

Comment.prototype.count = function (commentableType, commentableId) {
  if (!hasValue(commentableType)) {
    return Promise.reject('count() requires a commentable type.');
  }

  if (!this.availableCommentableTypes.includes(commentableType)) {
    return Promise.reject(`count() commentable type argument is invalid. Available commentable types are: ${this.availableCommentableTypes.join(', ')}.`);
  }

  if (!hasValue(commentableId)) {
    return Promise.reject('count() requires a commentable ID.');
  }

  return this.client.get('comment/count', { commentable_type: commentableType, commentable_id: commentableId });
};

Comment.prototype.create = function (userAuthToken, commentableType, commentableId, content) {
  if (!hasValue(userAuthToken)) {
    return Promise.reject('create() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (!hasValue(commentableType)) {
    return Promise.reject('create() requires a commentable type.');
  }

  if (!this.availableCommentableTypes.includes(commentableType)) {
    return Promise.reject(`create() commentable type argument is invalid. Available commentable types are: ${this.availableCommentableTypes.join(', ')}.`);
  }

  if (!hasValue(commentableId)) {
    return Promise.reject('create() requires a commentable ID.');
  }

  if (!hasValue(content)) {
    return Promise.reject('create() requires a content.');
  }

  return this.client.get('comment/create', { commentable_type: commentableType, commentable_id: commentableId, content, user_auth_token: userAuthToken });
};

Comment.prototype.delete = function (userAuthToken, commentId) {
  if (!hasValue(userAuthToken)) {
    return Promise.reject('delete() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (!hasValue(commentId)) {
    return Promise.reject('delete() requires a comment ID.');
  }

  return this.client.get('comment/delete', { comment_id: commentId, user_auth_token: userAuthToken });
};

Comment.prototype.flag = function (userAuthToken, commentId, flag) {
  if (!hasValue(userAuthToken)) {
    return Promise.reject('flag() requires an user auth token. You should use the user.login() method to get one.');
  }

  if (!hasValue(commentId)) {
    return Promise.reject('flag() requires a comment ID.');
  }

  if (!hasValue(flag)) {
    return Promise.reject('flag() requires a flag.');
  }

  if (!this.availableFlags.includes(flag)) {
    return Promise.reject(`flag() flag argument is invalid. Available flags are: ${this.availableFlags.join(', ')}.`);
  }

  return this.client.get('comment/flag', { comment_id: commentId, flag, user_auth_token: userAuthToken });
};

Comment.prototype.get = function (commentableType, commentableId, order, sort, limit, offset) {
  if (!hasValue(commentableType)) {
    return Promise.reject('get() requires a commentable type.');
  }

  if (!this.availableCommentableTypes.includes(commentableType)) {
    return Promise.reject(`get() commentable type argument is invalid. Available commentable types are: ${this.availableCommentableTypes.join(', ')}.`);
  }

  if (!hasValue(commentableId)) {
    return Promise.reject('get() requires a commentable ID.');
  }

  return this.client.get('comment/get', { commentable_type: commentableType, commentable_id: commentableId, order, sort, limit, offset });
};

module.exports = Comment;
