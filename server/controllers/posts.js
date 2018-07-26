<<<<<<< HEAD
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

mongoose.set('debug', true);


module.exports = {
  test: async (req, res) => {
    res.json({ msg: 'Events Work' });
  },

  addPost: async (req, res) => {
    const newPost = new Post({
      creator: req.user.id,
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
    User.findById(req.params.id)
      .then((user) => {
        Post.findById(req.params.idas)
          .then((post) => {
            if (post.creator.toString() !== req.params.id) {
              return res.status(401).json({ notauthorize: 'User not authorize' });
            }
            post.remove().then(() => {
              res.json({ success: true });
            })
              .catch((err) => {
                res.status(404).json({ nopostfound: 'No event found' });
              });
            return true;
          });
      });
  },

  getFeed: async (req, res) => {
    Post.find()
      .then((posts) => { res.json(posts); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No posts found' });
      });
  },

  likePost: async (req, res) => {
    res.json({ msg: 'Liking Works' });
  },

  sharePost: async (req, res) => {
    res.json({ msg: 'Sharing Works' });
  }

};
=======
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
>>>>>>> 04693f714486e87519954ec8e38d9e6c7971f6f0
