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
    describe('Get featured', function () {
      it('should throw an error for undefined type', function (done) {
        const client = new Qobuz(appId);

        client.playlist.getFeatured().should.be.rejectedWith('getFeatured() requires a type.').and.notify(done);
      });

      it('should throw an error for invalid type', function (done) {
        const client = new Qobuz(appId);

        client.playlist.getFeatured('invalid').should.be.rejectedWith('getFeatured() type argument is invalid. Available types are: last-created, editor-picks.').and.notify(done);
      });

      it('should return the featured playlists in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-featured.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.playlist.getFeatured('last-created', ['10', '64'], 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/playlist/getFeatured?app_id=100000000&type=last-created&genre_ids=10,64&limit=2',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
