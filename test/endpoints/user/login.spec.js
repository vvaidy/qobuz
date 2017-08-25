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
    describe('Login', function () {
      it('should throw an error for undefined username', function (done) {
        const client = new Qobuz(appId);

        client.user.login().should.be.rejectedWith('login() requires an username.').and.notify(done);
      });

      it('should throw an error for undefined password', function (done) {
        const client = new Qobuz(appId);

        client.user.login('myLogin').should.be.rejectedWith('login() requires a password.').and.notify(done);
      });

      it('should return the user in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./login.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.user.login('myLogin', '123456789abcdefghij', '16922031-0352-59D3-ADA2-B8E48236E8F0').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/user/login?app_id=100000000&username=myLogin&password=e59daacdfb8eb0873bad319c9f458c0a&device_manufacturer_id=16922031-0352-59D3-ADA2-B8E48236E8F0',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
