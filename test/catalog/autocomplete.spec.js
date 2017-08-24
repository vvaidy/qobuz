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
    describe('Autocomplete', function () {
      it('should throw an error for undefined query', function (done) {
        const client = new Qobuz(appId);

        client.catalog.autocomplete().should.be.rejectedWith('autocomplete() requires a query.').and.notify(done);
      });

      it('should return the search suggestions in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./autocomplete.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.catalog.autocomplete('m', 5).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/catalog/autocomplete?app_id=100000000&query=m&limit=5',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
