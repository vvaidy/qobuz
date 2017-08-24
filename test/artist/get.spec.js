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
    describe('Get', function () {
      it('should throw an error for undefined artist ID', function (done) {
        const client = new Qobuz(appId);

        client.artist.get().should.be.rejectedWith('get() requires an artist ID.').and.notify(done);
      });

      it('should throw an error for invalid extra', function (done) {
        const client = new Qobuz(appId);

        client.artist.get('36819', 'invalid').should.be.rejectedWith('get() extra argument is invalid. Available extras are: albums.').and.notify(done);
      });

      it('should return the artist in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.artist.get('36819').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/artist/get?app_id=100000000&artist_id=36819',
            json: true
          });
          done(err);
        });
      });

      it('should return the artist and its albums in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-with-albums.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.artist.get('36819', 'albums').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/artist/get?app_id=100000000&artist_id=36819&extra=albums',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
