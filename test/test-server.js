const chai = require('chai');
const chaiHttp = require('chai-http');

const {
  app,
  runServer,
  closeServer
} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog post', function () {
  before(function () {
    return runServer();
  });

  after(function () {
    return closeServer();
  });

  it('list posts on GET', function () {

  });


  it('add a Blog post on POST', function () {

  });

  it('delete a Blog post on DELETE', function () {

  });

  it('should update a Blog post on PUT', function () {

  });
});
