'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const request = require('request');
const Qobuz = require('../../lib');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Qobuz', function () {
  const appId = '100000000';

  describe('Label', function () {
    describe('Get', function () {
      it('should throw an error for undefined label ID', function (done) {
        const client = new Qobuz(appId);

        client.label.get().should.be.rejectedWith('get() requires a label ID.').and.notify(done);
      });

      it('should return label in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./get.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.label.get('1385').should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/label/get?app_id=100000000&label_id=1385',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
