'use strict';

const Article = function (client) {
  if (!client) {
    throw new Error('Client is required.');
  }

  this.client = client;
};

Article.prototype.get = function (articleId) {
  if (typeof articleId === 'undefined') {
    return Promise.reject('get() requires an article ID.');
  }

  return this.client.get('article/get', { article_id: articleId });
};

Article.prototype.getRelatedContent = function (articleId) {
  if (typeof articleId === 'undefined') {
    return Promise.reject('get() requires an article ID.');
  }

  return this.client.get('article/getRelatedContent', { article_id: articleId });
};

Article.prototype.listLastArticles = function (rubricIds, limit, offset) {
  if (rubricIds && !Array.isArray(rubricIds)) {
    return Promise.reject('listLastArticles() rubricIds must be null or an array.');
  }

  return this.client.get('article/listLastArticles', { rubric_ids: rubricIds, limit, offset });
};

Article.prototype.listRubrics = function (limit, offset) {
  return this.client.get('article/listRubrics', { limit, offset });
};

module.exports = Article;
