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
    describe('Delete tracks', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.playlist.deleteTracks().should.be.rejectedWith('deleteTracks() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for undefined playlist ID', function (done) {
        const client = new Qobuz(appId);

        client.playlist.deleteTracks('MyUsErToKeN').should.be.rejectedWith('deleteTracks() requires a playlist ID.').and.notify(done);
      });

      it('should throw an error for undefined playlist track IDs', function (done) {
        const client = new Qobuz(appId);

        client.playlist.deleteTracks('MyUsErToKeN', '213676').should.be.rejectedWith('deleteTracks() requires a playlist track IDs.').and.notify(done);
      });

      it('should throw an error for non array playlist track IDs', function (done) {
        const client = new Qobuz(appId);

        client.playlist.deleteTracks('MyUsErToKeN', '213676', 'id').should.be.rejectedWith('deleteTracks() playlist track IDs must be an array.').and.notify(done);
      });

      it('should return success in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('../success.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

        client.playlist.deleteTracks('MyUsErToKeN', '213676', ['12323456', '123456', '234567', '4567890']).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/deleteTracks?app_id=100000000&playlist_id=213676&playlist_track_ids=12323456,123456,234567,4567890&user_auth_token=MyUsErToKeN',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
