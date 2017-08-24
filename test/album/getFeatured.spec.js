'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const request = require('request');
const Qobuz = require('../../lib');

chai.should();
chai.use(chaiAsPromised);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Album', function () {
    describe('Get featured', function () {
      it('should throw an error for invalid type', function (done) {
        const client = new Qobuz(appId);

        client.album.getFeatured('invalid').should.be.rejectedWith('getFeatured() type argument is invalid. Available types are: best-sellers, most-streamed, new-releases, press-awards, editor-picks, most-featured.').and.notify(done);
      });

      it('should return the the album recommandations in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./getFeatured.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.album.getFeatured('new-releases', 64, 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/album/getFeatured?app_id=100000000&type=new-releases&genre_id=64&limit=2',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
