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

  describe('Track', function () {
    describe('Get', function () {
      it('should throw an error for undefined track ID', function (done) {
        const client = new Qobuz(appId);

        client.track.get().should.be.rejectedWith('get() requires a track ID.').and.notify(done);
      });

      it('should return track in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.track.get('24231261').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/track/get?app_id=100000000&track_id=24231261',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
