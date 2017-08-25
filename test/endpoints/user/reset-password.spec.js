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

  describe('User', function () {
    describe('Reset password', function () {
      it('should throw an error for undefined username', function (done) {
        const client = new Qobuz(appId);

        client.user.resetPassword().should.be.rejectedWith('login() requires an username or an email.').and.notify(done);
      });

      it('should return success in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('../success.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.user.resetPassword('foo').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/user/resetPassword?app_id=100000000&username=foo',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
