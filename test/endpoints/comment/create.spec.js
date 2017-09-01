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

  describe('Comment', function () {
    describe('Create', function () {
      it('should throw an error for undefined user auth token', function (done) {
        const client = new Qobuz(appId);

        client.comment.create().should.be.rejectedWith('create() requires an user auth token. You should use the user.login() method to get one.').and.notify(done);
      });

      it('should throw an error for undefined commentable type', function (done) {
        const client = new Qobuz(appId);

        client.comment.create('MyAuThTokEn').should.be.rejectedWith('create() requires a commentable type.').and.notify(done);
      });

      it('should throw an error for invalid commentable type', function (done) {
        const client = new Qobuz(appId);

        client.comment.create('MyAuThTokEn', 'invalid').should.be.rejectedWith('create() commentable type argument is invalid. Available commentable types are: album, article, blog.').and.notify(done);
      });

      it('should throw an error for undefined commentable ID', function (done) {
        const client = new Qobuz(appId);

        client.comment.create('MyAuThTokEn', 'album').should.be.rejectedWith('create() requires a commentable ID.').and.notify(done);
      });

      it('should throw an error for undefined content', function (done) {
        const client = new Qobuz(appId);

        client.comment.create('MyAuThTokEn', 'album', '0886443927087').should.be.rejectedWith('create() requires a content.').and.notify(done);
      });

      it('should return total create in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./create.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

        client.comment.create('MyAuThTokEn', 'album', '0886443927087', 'Cet album est génial').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/comment/create?app_id=100000000&commentable_type=album&commentable_id=0886443927087&content=Cet%20album%20est%20g%C3%A9nial&user_auth_token=MyAuThTokEn',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
