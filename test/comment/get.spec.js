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

  describe('Comment', function () {
    describe('Get', function () {
      it('should throw an error for undefined commentable type', function (done) {
        const client = new Qobuz(appId);

        client.comment.get().should.be.rejectedWith('get() requires a commentable type.').and.notify(done);
      });

      it('should throw an error for invalid commentable type', function (done) {
        const client = new Qobuz(appId);

        client.comment.get('invalid').should.be.rejectedWith('get() commentable type argument is invalid. Available commentable types are: album, article, blog.').and.notify(done);
      });

      it('should throw an error for undefined commentable ID', function (done) {
        const client = new Qobuz(appId);

        client.comment.get('album').should.be.rejectedWith('get() requires a commentable ID.').and.notify(done);
      });

      it('should return the comments in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.comment.get('album', '0886443927087').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/comment/get?app_id=100000000&commentable_type=album&commentable_id=0886443927087',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
