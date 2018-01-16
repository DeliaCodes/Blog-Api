"use strict";
const express = require('express');
const router = express.Router();

const app = express();

//modularize routes
const {
  BlogPosts
} = require('./models');

//blog posts for the server
BlogPosts.create('Star Wars and the use of Stock Characters', 'Is Lana Del Ray really Rey? Who Can tell the difference? What were those small furry creatures anyway? How do we know snoke isnt secret alternative universe Darth Maul?', 'by Seru4ever');

//get the blog posts that are on the server
app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

//post to the blog posts on the server

//delete a blog post
app.delete('/blog-posts/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  res.send(204).end();
})

//update a blog post using put

app.listen(process.env.PORT || 8060, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8060}`);
})
