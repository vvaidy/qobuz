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
  const appSecret = 'c825fa30896f11e7bb31be2e44b06b34';

  describe('Track', function () {
    describe('Get file url', function () {
      it('should throw an error for undefined track ID', function (done) {
        const client = new Qobuz(appId);

        client.track.getFileUrl().should.be.rejectedWith('getFileUrl() requires a track ID.').and.notify(done);
      });

      it('should throw an error for invalid format ID', function (done) {
        const client = new Qobuz(appId);

        client.track.getFileUrl(null, '23601296', 'invalid').should.be.rejectedWith('getFileUrl() format ID argument is invalid. Available format IDs are: 5, 6, 7, 27.').and.notify(done);
      });

      it('should throw an error for invalid intent', function (done) {
        const client = new Qobuz(appId);

        client.track.getFileUrl(null, '23601296', '5', 'invalid').should.be.rejectedWith('getFileUrl() intent argument is invalid. Available intents are: stream, import, download.').and.notify(done);
      });

      it('should return the file url in JSON', function (done) {
        const client = new Qobuz(appId, appSecret);
        const expected = require('./get-file-url.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));
        const requestTs = 1431447073;
        const clock = sinon.useFakeTimers(requestTs * 1000);

        client.track.getFileUrl(null, '23601296', '6', 'stream').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          clock.restore();
          stub.should.have.been.calledWith({
            uri: `http://www.qobuz.com/api.json/0.2/track/getFileUrl?app_id=100000000&request_ts=${requestTs}&request_sig=ed0c7d7e74ab9abfac76f02e722ed59e&track_id=23601296&format_id=6&intent=stream`,
            json: true
          });
          done(err);
        });
      });
    });
  });
});
