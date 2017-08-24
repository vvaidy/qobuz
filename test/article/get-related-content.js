'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const request = require('request');
const Qobuz = require('../../lib');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Article', function () {
    describe('Get related content', function () {
      it('should throw an error for undefined article ID', function (done) {
        const client = new Qobuz(appId);

        client.article.getRelatedContent().should.be.rejectedWith('get() requires an article ID.').and.notify(done);
      });
    
      it('should return the related content in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-related-content.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));
    
        client.article.getRelatedContent('173711').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/article/getRelatedContent?app_id=100000000&article_id=173711',
            json: true
          });
          done(err);
        });
      });
    });  
  });
});
