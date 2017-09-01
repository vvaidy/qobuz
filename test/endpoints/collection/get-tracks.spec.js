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

  describe('Collection', function () {
    describe('Get tracks', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.collection.getTracks().should.be.rejectedWith('getTracks() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for invalid source', function (done) {
        const client = new Qobuz(appId);

        client.collection.getTracks('MyAuThTokEn', 'invalid').should.be.rejectedWith('getTracks() source argument is invalid. Available sources are: playlists, purchases, favorites.').and.notify(done);
      });

      it('should return the user\'s tracks in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-tracks.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

        client.collection.getTracks('MyAuThTokEn', null, null, null, null, 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/collection/getTracks?app_id=100000000&limit=2&user_auth_token=MyAuThTokEn',
            json: true
          });
          done(err);
        });

        it('should return the user\'s filtered tracks in JSON', function (done) {
          const client = new Qobuz(appId);
          const expected = require('./get-tracks-filtered.json');
          const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

          client.collection.getTracks('MyAuThTokEn', null, null, null, 'dio', 2).should.eventually.deep.equal(expected).and.notify((err) => {
            stub.restore();
            stub.should.have.been.calledWith({
              uri: 'http://www.qobuz.com/api.json/0.2/collection/getTracks?app_id=100000000&query=dio&limit=2&user_auth_token=MyAuThTokEn',
              json: true
            });
            done(err);
          });
        });
      });
    });
  });
});
