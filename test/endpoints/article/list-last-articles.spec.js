'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const request = require('request');
const Qobuz = require('../../../lib');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Article', function () {
    describe('List last articles', function () {
      it('should throw an error for non array rubric IDs', function (done) {
        const client = new Qobuz(appId);

        client.article.listLastArticles('10').should.be.rejectedWith('listLastArticles() rubric IDs must be null or an array.').and.notify(done);
      });

      it('should return the last articles in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./list-last-articles.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

        client.article.listLastArticles(['10'], 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/article/listLastArticles?app_id=100000000&rubric_ids=10&limit=2',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
