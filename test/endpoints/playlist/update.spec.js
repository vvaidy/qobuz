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
    describe('Update', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.playlist.update().should.be.rejectedWith('update() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for undefined playlist ID', function (done) {
        const client = new Qobuz(appId);

        client.playlist.update('MyUsErToKeN').should.be.rejectedWith('update() requires a playlist ID.').and.notify(done);
      });

      it('should return the playlist in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./update.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

        client.playlist.update('MyUsErToKeN', '925206', 'greatPlaylist').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/update?app_id=100000000&playlist_id=925206&name=greatPlaylist&user_auth_token=MyUsErToKeN',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
