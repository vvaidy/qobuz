'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const request = require('request');
const Qobuz = require('../../../lib');

chai.should();
chai.use(chaiAsPromised);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Purchase', function () {
    describe('Get user purchases', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.purchase.getUserPurchases().should.be.rejectedWith('getUserPurchases() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should return the articles in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-user-purchases.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.purchase.getUserPurchases('myTokEnAuTh').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/purchase/getUserPurchases?app_id=100000000&user_auth_token=myTokEnAuTh',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
