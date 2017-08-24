'use strict';

const chai = require('chai');
const Qobuz = require('../lib');

chai.should();

describe('Qobuz', function () {
  const appId = '1000000000';

  describe('ctor', function () {
    function ctor() {
      new Qobuz(null);
    }

    it('should throw an error for undefined application ID', function (done) {
      ctor.should.throw('Client requires an application ID.');
      done();
    });

    it('should set the application ID', function (done) {
      const client = new Qobuz(appId);

      client.appId.should.be.equal(appId);
      done();
    });

    it('should set the application ID from the environment variable', function (done) {
      process.env.QOBUZ_APP_ID = appId;

      const client = new Qobuz();
      process.env.QOBUZ_APP_ID = undefined;

      client.appId.should.be.equal(appId);
      done();
    });

    it('should initialize the album endpoint', function (done) {
      const client = new Qobuz(appId);

      client.album.should.not.be.null;
      done();
    });

    it('should initialize the article endpoint', function (done) {
      const client = new Qobuz(appId);

      client.article.should.not.be.null;
      done();
    });

    it('should initialize the artist endpoint', function (done) {
      const client = new Qobuz(appId);

      client.artist.should.not.be.null;
      done();
    });

    it('should initialize the catalog endpoint', function (done) {
      const client = new Qobuz(appId);

      client.catalog.should.not.be.null;
      done();
    });
  });
});
