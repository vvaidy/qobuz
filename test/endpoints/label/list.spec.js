'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const request = require('request');
const Qobuz = require('../../../lib');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Label', function () {
    describe('List', function () {
      it('should return a list of label in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./list.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.label.list(5, 1340).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/label/list?app_id=100000000&limit=5&offset=1340',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
