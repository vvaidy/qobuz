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
  const appId = '1000000000';

  describe('Album', function () {
    describe('Get', function () {
      it('should throw an error for undefined album ID', function (done) {
        const client = new Qobuz(appId);

        client.album.get().should.be.rejectedWith('get() requires an album ID.').and.notify(done);
      });

      it('should return album in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.album.get('0886443927087').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/album/get?app_id=1000000000&album_id=0886443927087',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
