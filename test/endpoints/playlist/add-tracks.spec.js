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
    describe('Add tracks', function () {
      it('should throw an error for undefined playlist ID', function (done) {
        const client = new Qobuz(appId);

        client.playlist.addTracks(null).should.be.rejectedWith('addTracks() requires a playlist ID.').and.notify(done);
      });

      it('should throw an error for non array track IDs', function (done) {
        const client = new Qobuz(appId);

        client.playlist.addTracks(null, '923460', 'id').should.be.rejectedWith('addTracks() track IDs must be null or an array.').and.notify(done);
      });

      it('should return the playlist in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./add-tracks.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

        client.playlist.addTracks('MyUsErToKeN', '923460', ['24231270', '24231276']).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/addTracks?app_id=100000000&playlist_id=923460&track_ids=24231270,24231276&user_auth_token=MyUsErToKeN',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
