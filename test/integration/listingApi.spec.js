import request from 'request';
import bluebird from 'bluebird';
import { expect } from 'chai';
import app from '../../app';
import getPort from 'get-port';

const req = bluebird.promisifyAll(request);

describe('listing api', () => {
  let baseUrl, server;
  before(async() => {
    const port = await getPort();
    baseUrl = `http://127.0.0.1:${port}/listings`;
    server = app.listen(port);
  });
  after(() => {
    server.close();
  });
  describe('GET /listings', () => {
    let result;
    before(async() => {
      result = await req.getAsync(baseUrl);
    });
    it('should return 200', (done) => {
      expect(result.statusCode).to.equal(200);
      done();
    });
    it('should return two listings', (done) => {
      expect(JSON.parse(result.body).number).to.equal(2);
      done();
    });
  });

  describe('GET /listings/:id', () => {
    let result;
    before(async() => {
      result = await req.getAsync(baseUrl + '/6000011');
    });
    it('should return 200', (done) => {
      expect(result.statusCode).to.equal(200);
      done();
    });
    it('should return listing with the correct id', (done) => {
      expect(JSON.parse(result.body).number).to.equal(1);
      expect(JSON.parse(result.body).listings[0].documentid).to.equal('6000011');
      done();
    });
  });
});
