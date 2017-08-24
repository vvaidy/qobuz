'use strict';

function article(client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  return {
    get: get,
    getRelatedContent: getRelatedContent,
    listLastArticles: listLastArticles
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

  function listLastArticles (rubricIds, limit, offset) {
    if (rubricIds && !Array.isArray(rubricIds)) {
      return Promise.reject('listLastArticles() rubricIds must be null or an array.');
    }

    return client.get('article/listLastArticles', { rubric_ids: rubricIds, limit, offset });
  }
}

module.exports = article;
