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
    describe('Search', function () {
      it('should throw an error for undefined query', function (done) {
        const client = new Qobuz(appId);

        client.album.search().should.be.rejectedWith('search() requires a query.').and.notify(done);
      });
    
      it('should return the search results in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./search.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));
    
        client.album.search('John Cage', 2).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          done(err);
        });
      });
    });  
  });
});
