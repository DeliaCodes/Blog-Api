"use strict";
const express = require('express');
const router = express.Router();

const app = express();

//modularize routes
const BlogPosts = require('./models');

//blog posts for the server

//get the blog posts that are on the server
app.get('/blog-posts', (req, res) => {

})

//post to the blog posts on the server

//delete a blog post
//update a blog post using put
