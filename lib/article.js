'use strict';

function article(client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  return {
    get: get,
    getRelatedContent: getRelatedContent
  };

  function get (articleId) {
    if (typeof articleId === 'undefined') {
      return Promise.reject('get() requires an article ID.');
    }

    return client.get('article/get', { article_id: articleId });
  }

  function getRelatedContent (articleId) {
    if (typeof articleId === 'undefined') {
      return Promise.reject('get() requires an article ID.');
    }

    return client.get('article/getRelatedContent', { article_id: articleId });
  }
}

module.exports = article;
