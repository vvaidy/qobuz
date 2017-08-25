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
    describe('Create', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.playlist.create().should.be.rejectedWith('create() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for undefined name', function (done) {
        const client = new Qobuz(appId);

        client.playlist.create('MyUsErToKeN').should.be.rejectedWith('create() requires a name.').and.notify(done);
      });

      it('should throw an error for non array track IDs', function (done) {
        const client = new Qobuz(appId);

        client.playlist.create('MyUsErToKeN', 'superPlaylist', 'Fantastic', true, false, 'id').should.be.rejectedWith('addTracks() track IDs must be null or an array.').and.notify(done);
      });

      it('should return the playlist in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./create.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.playlist.create('MyUsErToKeN', 'superPlaylist', 'Fantastic', true, false).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/create?app_id=100000000&name=superPlaylist&description=Fantastic&is_public=1&is_collaborative=0&user_auth_token=MyUsErToKeN',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
