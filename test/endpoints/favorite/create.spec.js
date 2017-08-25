'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const request = require('request');
const Qobuz = require('../../../lib');

chai.should();
chai.use(chaiAsPromised);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Favorite', function () {
    describe('Create', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.favorite.create().should.be.rejectedWith('create() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for non array artist IDs', function (done) {
        const client = new Qobuz(appId);

        client.favorite.create('MyAuThTokEn', 'id').should.be.rejectedWith('create() artist IDs must be null or an array.').and.notify(done);
      });

      it('should throw an error for non array album IDs', function (done) {
        const client = new Qobuz(appId);

        client.favorite.create('MyAuThTokEn', null, 'id').should.be.rejectedWith('create() album IDs must be null or an array.').and.notify(done);
      });

      it('should throw an error for non array track IDs', function (done) {
        const client = new Qobuz(appId);

        client.favorite.create('MyAuThTokEn', null, null, 'id').should.be.rejectedWith('create() track IDs must be null or an array.').and.notify(done);
      });

      it('should throw an error for null artist/album/track IDs', function (done) {
        const client = new Qobuz(appId);

        client.favorite.create('MyAuThTokEn').should.be.rejectedWith('create() requires either artist IDs, album IDs, or track IDs.').and.notify(done);
      });

      it('should return the user\'s albums in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('../success.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.favorite.create('MyAuThTokEn', null, ['0060253723059']).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/favorite/create?app_id=100000000&album_ids=0060253723059&user_auth_token=MyAuThTokEn',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
