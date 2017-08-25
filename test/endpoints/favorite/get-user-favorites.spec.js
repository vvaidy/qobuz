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
    describe('Get user favorites', function () {
      it('should throw an error for invalid type', function (done) {
        const client = new Qobuz(appId);

        client.favorite.getUserFavorites('MyAuThTokEn', null, 'invalid').should.be.rejectedWith('getUserFavorites() type argument is invalid. Available types are: tracks, albums, artists, articles.').and.notify(done);
      });

      it('should throw an error for null user auth token and user ID', function (done) {
        const client = new Qobuz(appId);

        client.favorite.getUserFavorites().should.be.rejectedWith('getUserFavorites() requires either user auth token or user ID.').and.notify(done);
      });

      it('should return the user\'s favorites in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get-user-favorites.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.favorite.getUserFavorites('MyAuThTokEn', null, 'albums', 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/favorite/getUserFavorites?app_id=100000000&type=albums&limit=2&user_auth_token=MyAuThTokEn',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
