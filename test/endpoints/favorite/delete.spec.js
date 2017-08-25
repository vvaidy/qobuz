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
    describe('Delete', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.favorite.delete().should.be.rejectedWith('delete() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for non array artist IDs', function (done) {
        const client = new Qobuz(appId);

        client.favorite.delete('MyAuThTokEn', 'id').should.be.rejectedWith('delete() artist IDs must be null or an array.').and.notify(done);
      });

      it('should throw an error for non array album IDs', function (done) {
        const client = new Qobuz(appId);

        client.favorite.delete('MyAuThTokEn', null, 'id').should.be.rejectedWith('delete() album IDs must be null or an array.').and.notify(done);
      });

      it('should throw an error for non array track IDs', function (done) {
        const client = new Qobuz(appId);

        client.favorite.delete('MyAuThTokEn', null, null, 'id').should.be.rejectedWith('delete() track IDs must be null or an array.').and.notify(done);
      });

      it('should throw an error for null artist/album/track IDs', function (done) {
        const client = new Qobuz(appId);

        client.favorite.delete('MyAuThTokEn').should.be.rejectedWith('delete() requires either artist IDs, album IDs, or track IDs.').and.notify(done);
      });

      it('should return the user\'s albums in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('../success.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.favorite.delete('MyAuThTokEn', null, ['0060253723059']).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/favorite/delete?app_id=100000000&album_ids=0060253723059&user_auth_token=MyAuThTokEn',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
