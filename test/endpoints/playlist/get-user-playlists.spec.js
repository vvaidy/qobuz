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
    describe('Get user playlists', function () {
      it('should return the user\'s playlists in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-user-playlists.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.playlist.getUserPlaylists(null, null, 'loris', null, 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/getUserPlaylists?app_id=100000000&username=loris&limit=2',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
