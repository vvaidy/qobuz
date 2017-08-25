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

  describe('Comment', function () {
    describe('Flag', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.comment.flag().should.be.rejectedWith('flag() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for undefined comment ID', function (done) {
        const client = new Qobuz(appId);

        client.comment.flag('MyAuThTokEn').should.be.rejectedWith('flag() requires a comment ID.').and.notify(done);
      });

      it('should throw an error for undefined flag', function (done) {
        const client = new Qobuz(appId);

        client.comment.flag('MyAuThTokEn', '123456').should.be.rejectedWith('flag() requires a flag.').and.notify(done);
      });

      it('should throw an error for invalid flag', function (done) {
        const client = new Qobuz(appId);

        client.comment.flag('MyAuThTokEn', '123456', 'invalid').should.be.rejectedWith('flag() flag argument is invalid. Available flags are: abuse.').and.notify(done);
      });

      it('should return success in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./success.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.comment.flag('MyAuThTokEn', '123456', 'abuse').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/comment/flag?app_id=100000000&comment_id=123456&flag=abuse&user_auth_token=MyAuThTokEn',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
