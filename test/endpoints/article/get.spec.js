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
    describe('Get', function () {
      it('should throw an error for undefined article ID', function (done) {
        const client = new Qobuz(appId);

        client.article.get().should.be.rejectedWith('get() requires an article ID.').and.notify(done);
      });

      it('should return the article in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

        client.article.get('176977').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/article/get?app_id=100000000&article_id=176977',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
