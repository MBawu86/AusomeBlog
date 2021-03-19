// dependencies ===============
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
// SEED ROUTE: drop and seed database ===============
const postSeed = require('../models/postSeed');
router.get('/seed', (req, res) => {
  // drop database - prevents from seeding the same data over and over. But remember, it will drop all new changes to your database!
  Post.deleteMany({}, () => {});
  // seed database with data from seed file
  Post.create(postSeed, (error, data) => {
    error ? res.status(400).json(error) : res.status(200).json(data);
  })
})
// READ ROUTE: get all posts ==============
router.get('/', (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render('blog', {
      posts: allPosts
    })
  })
})
// CREATE PAGE: render the new post form ==============
router.get('/new', (req, res) => {
  res.render('new')
})

//DELETE ROUTE: delete post

router.delete('/:id', (req, res)=>{
    Post.findByIdAndDelete(req.params.id, (error, deletePost)=>{
        res.redirect('/blog')
    })
})

// UPDATE ROUTE: update post ===============
router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, (error, updatedPost) => {
      res.redirect(`/blog/${req.params.id}`)
    })
  })

// CREATE ROUTE: create new blog post ===============
router.post('/', (req, res) => {
  Post.create(req.body, (error, newPost) => {
    res.redirect('/blog');
  })
})
// EDIT PAGE: render edit post form ===============
router.get('/edit/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render('edit', {
      post: foundPost
    })
  })
})
// READ ROUTE: get single post ===============
router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render('show', {
      post: foundPost
    })
  })
})
// exports ===============
module.exports = router;