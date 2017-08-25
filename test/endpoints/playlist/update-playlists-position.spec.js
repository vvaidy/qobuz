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

  describe('Playlist', function () {
    describe('Update playlists position', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.playlist.updatePlaylistsPosition().should.be.rejectedWith('updatePlaylistsPosition() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for undefined playlist IDs', function (done) {
        const client = new Qobuz(appId);

        client.playlist.updatePlaylistsPosition('MyUsErToKeN').should.be.rejectedWith('updatePlaylistsPosition() requires playlist IDs.').and.notify(done);
      });

      it('should throw an error for non array playlist IDs', function (done) {
        const client = new Qobuz(appId);

        client.playlist.updatePlaylistsPosition('MyUsErToKeN', 'id').should.be.rejectedWith('updatePlaylistsPosition() playlist IDs must be an array.').and.notify(done);
      });

      it('should return success in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./success.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.playlist.updatePlaylistsPosition('MyUsErToKeN', ['213676', '23456']).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/updatePlaylistsPosition?app_id=100000000&playlist_ids=213676,23456&user_auth_token=MyUsErToKeN',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
