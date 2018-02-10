"use strict";
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {
  app,
  runServer,
  closeServer
} = require('../server');

const expect = chai.expect;



describe('Blog post', function () {
  before(function () {
    return runServer();
  });

  after(function () {
    return closeServer();
  });

  it('list posts on GET', function () {

    return chai.request(app)
      .get('/blog-posts')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(1);
        const expectedKeys = ['title', 'content', 'author'];
        res.body.forEach(function (item) {
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });

  it('add a Blog post on POST', function () {

    const newPost = {
      title: 'Where Have All The Pigs Gone?',
      content: 'They have caught the flu.',
      author: 'Miss Piggy'
    };

    return chai.request(app)
      .post('/blog-posts')
      .send(newPost)
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('title', 'content', 'author');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(Object.assign(newPost, {
          id: res.body.id
        }));
      });
  });

  it('delete a Blog post on DELETE', function () {
    return chai.request(app)
      .get('/blot-posts')
      .then(function (res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function (res) {
        expect(res).to.have.status(204);
      });
  });

  it('should update a Blog post on PUT', function () {
    const updateBlogPost = {
      'title': 'How Is This Possible???',
      'content': 'Lorem Ipsum',
    };
    return chai.request(app)
      .get('/blog-posts')
      .then(function (res) {
        updateBlogPost.id = res.body[0].id;
        return chai.request(app)
          .put(`/blog-posts/${updateBlogPost.id}`)
          .send(updateBlogPost);
      })
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.deep.equal(updateBlogPost);
      });
  });

});
