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

  describe('Catalog', function () {
    describe('Count', function () {
      it('should throw an error for undefined query', function (done) {
        const client = new Qobuz(appId);

        client.catalog.count().should.be.rejectedWith('count() requires a query.').and.notify(done);
      });

      it('should return the count results in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./count.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.catalog.count('Radiohead').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/catalog/count?app_id=100000000&query=Radiohead',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
