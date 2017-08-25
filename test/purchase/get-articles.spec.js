'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const request = require('request');
const Qobuz = require('../../lib');

chai.should();
chai.use(chaiAsPromised);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Purchase', function () {
    describe('Get articles', function () {
      it('should throw an error for null album and track ID', function (done) {
        const client = new Qobuz(appId);

        client.purchase.getArticles().should.be.rejectedWith('getArticles() requires either an album ID or a track ID.').and.notify(done);
      });

      it('should return the articles in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-articles.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.purchase.getArticles('0808699111126').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/purchase/getArticles?app_id=100000000&album_id=0808699111126',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
