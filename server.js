"use strict";
const resolve = require('dns');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;



//modularize routes?
const {
  BlogPostsData
} = require('./models');

const {
  PORT,
  DATABASE_URL
} = require('./config');
mongoose.connect(DATABASE_URL);
app.use(bodyParser.json());

//blog posts to go into the database
/* BlogPosts.create('Star Wars and the use of Stock Characters', 'Is Lana Del Ray really Rey? Who Can tell the difference? What were those small furry creatures anyway? How do we know snoke isnt secret alternative universe Darth Maul?', 'by Seru4ever');
BlogPosts.create('Where have all of the sensible people gone', 'Something something about doing it yourself and never relying on anyone', 'by Gamer4579231');
BlogPosts.create('How Atomic Blonde is the worst movie ever', 'Charlize Theron really? And fucking James Gascoine - why was he ever dead?', 'by Agent Strange'); */

//get the blog posts that are on the server
app.get('/blog-posts', (req, res) => {
  BlogPostsData
    .find()
    .then(BlogPosts => {
      res.json({
          BlogPosts: BlogPosts.map((BlogPosts) => BlogPosts.serialize())
        })
        .catch(
          err => {
            console.error(err);
            res.status(500).json({
              message: 'Internal Server Error'
            });
          });
    });

});
// get by id
app.get('/blog-posts/:id', (req, res) => {
  BlogPostsData
    .findById(req.params.id)
    .then(BlogPosts => res.json(BlogPosts.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Internal server error'
      });
    });
});

app.get('/blog-posts', (req, res) => {
  const filters = {};
  const queryableFields = ['title', 'author'];
  queryableFields.forEach(field => {
    if (req.query[field]) {
      filters[field] = req.query[field];
    }
  });
});

//post to the blog posts on the server
app.post('/blog-posts', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  // const req.body.map(
  //if requiredFields are in req.then perform the action?
  //);
});

//delete a blog post
app.delete('/blog-posts/:id', (req, res) => {
  BlogPostsData.delete(req.params.id);
  res.send(204).end();
});

//update a blog post using put
app.put('/blog-posts/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  //sort through the body and do an update


});

let server;

const runServer = (DATABASE_URL, port = PORT) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, {
      useMongoClient: true
    }, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      }).on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
};


const closeServer = () => {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {
  app,
  runServer,
  closeServer
};

//starts the server
/* app.listen(process.env.PORT || 8060, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8060}`);
}) */
