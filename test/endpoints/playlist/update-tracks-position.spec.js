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
    describe('Update tracks position', function () {
      it('should throw an error for undefined playlist ID', function (done) {
        const client = new Qobuz(appId);

        client.playlist.updateTracksPosition('MyUsErToKeN').should.be.rejectedWith('updateTracksPosition() requires a playlist ID.').and.notify(done);
      });

      it('should throw an error for undefined insert before value', function (done) {
        const client = new Qobuz(appId);

        client.playlist.updateTracksPosition('MyUsErToKeN', '213676', ['12323456', '123456', '234567', '4567890']).should.be.rejectedWith('updateTracksPosition() requires an insert before value.').and.notify(done);
      });

      it('should return success in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('../success.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.playlist.updateTracksPosition('MyUsErToKeN', '213676', ['12323456', '123456', '234567', '4567890'], 1).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/updateTracksPosition?app_id=100000000&playlist_id=213676&playlist_track_ids=12323456,123456,234567,4567890&insert_before=1&user_auth_token=MyUsErToKeN',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
