'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const request = require('request');
const Qobuz = require('../../lib');

chai.should();
chai.use(chaiAsPromised);

describe('Qobuz', function () {
  const appId = '18ea6204-882f-11e7-bb31-be2e44b06b34';

  describe('Album', function () {
    describe('Get', function () {
      it('should throw an error for undefined album ID', function (done) {
        const client = new Qobuz(appId);

        client.album.get().should.be.rejectedWith('getAlbum() requires an album ID.').and.notify(done);
      });
    
      it('should return the album in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./0886443927087.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));
    
        client.album.get('0886443927087').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          done(err);
        });
      });
    });  
  });
});
