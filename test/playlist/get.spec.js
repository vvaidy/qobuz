'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const request = require('request');
const Qobuz = require('../../lib');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Playlist', function () {
    describe('Get', function () {
      it('should throw an error for undefined playlist ID', function (done) {
        const client = new Qobuz(appId);

        client.playlist.get(null).should.be.rejectedWith('get() requires a playlist ID.').and.notify(done);
      });

      it('should throw an error for invalid type', function (done) {
        const client = new Qobuz(appId);

        client.playlist.get(null, '49806', 'invalid').should.be.rejectedWith('get() extra argument is invalid. Available extras are: tracks.').and.notify(done);
      });

      it('should return the playlist in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.playlist.get(null, '49806', 'tracks', 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/get?app_id=100000000&playlist_id=49806&extra=tracks&limit=2',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
