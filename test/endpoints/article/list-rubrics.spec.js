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

  describe('Article', function () {
    describe('List rubrics', function () {
      it('should return the rubric list in JSON', function (done) {
        const client = new Qobuz(appId);
        const expected = require('./list-rubrics.json');
        const stub = sinon.stub(request, 'get').callsFake((options, callback) => callback(null, null, expected));

        client.article.listRubrics(8).should.eventually.deep.equal(expected).and.notify((err) => {
          stub.restore();
          stub.should.have.been.calledWith({
            uri: 'http://www.qobuz.com/api.json/0.2/article/listRubrics?app_id=100000000&limit=8',
            json: true
          });
          done(err);
        });
      });
    });
  });
});
