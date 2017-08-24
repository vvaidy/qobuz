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

  describe('Artist', function () {
    describe('Get similar artists', function () {
      it('should throw an error for undefined artist ID', function (done) {
        const client = new Qobuz(appId);

        client.artist.getSimilarArtists().should.be.rejectedWith('get() requires an artist ID.').and.notify(done);
      });

      it('should return the similar artists in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-similar-artists.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.artist.getSimilarArtists('118680', 3).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/artist/getSimilarArtists?app_id=100000000&artist_id=118680&limit=3',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
