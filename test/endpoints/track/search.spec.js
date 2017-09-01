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

  describe('Track', function () {
    describe('Search', function () {
      it('should throw an error for undefined query', function (done) {
        const client = new Qobuz(appId);

        client.track.search().should.be.rejectedWith('search() requires a query.').and.notify(done);
      });

      it('should return the search results in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./search.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, { statusCode: 200 }, expected));

        client.track.search('Thriller', 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/track/search?app_id=100000000&query=Thriller&limit=2',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
