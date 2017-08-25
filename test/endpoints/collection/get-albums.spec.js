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
    describe('Get albums', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.collection.getAlbums().should.be.rejectedWith('getAlbums() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for invalid source', function (done) {
        const client = new Qobuz(appId);

        client.collection.getAlbums('MyAuThTokEn', 'invalid').should.be.rejectedWith('getAlbums() source argument is invalid. Available sources are: playlists, purchases, favorites.').and.notify(done);
      });

      it('should return the user\'s albums in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-albums.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.collection.getAlbums('MyAuThTokEn', null, null, null, 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/collection/getAlbums?app_id=100000000&limit=2&user_auth_token=MyAuThTokEn',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
