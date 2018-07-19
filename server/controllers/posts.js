const mongoose = require('mongoose');
// const User = require('../models/user');
const Post = require('../models/post');

mongoose.set('debug', true);


module.exports = {
  test: async (req, res) => {
    res.json({ msg: 'Events Work' });
  },

  addPost: async (req, res) => {
    const newPost = new Post({
      author: req.user.id,
      postBody: req.body.postBody,
      datePosted: req.body.datePosted
    });

    newPost.save().then((post) => {
      res.json(post);
    });
  },

  getPost: async (req, res) => {
    res.json({ msg: 'Get Post Works' });
  },

  deletePost: async (req, res) => {
    res.json({ msg: 'Delete Post Works' });
  },

  getFeed: async (req, res) => {
    res.json({ msg: 'Get Feed Works' });
  },

  likePost: async (req, res) => {
    res.json({ msg: 'Liking Works' });
  },

  sharePost: async (req, res) => {
    res.json({ msg: 'Sharing Works' });
  }
};
