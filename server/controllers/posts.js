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
      creator: req.user.id,
      postBody: req.body.postBody,
      datePosted: req.body.datePosted,
      photo: req.body.photo
    });

    newPost.save().then((post) => {
      res.json(post);
    });
  },

  getPost: async (req, res) => {
    Post.findById(req.params.id)
      .populate('creator')
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No post found' });
      });
  },

  // SOFT DELETE
  deletePost: async (req, res) => {
    Post.findById(req.params.id).then((post) => {
      post
        .update({ isDeleted: true })
        .then(() => {
          res.json({ success: true });
        })
        .catch((err) => {
          res.status(404).json({ nopostfound: 'No event found' });
        });
      return true;
    });
  },

  getFeed: async (req, res) => {
    Post.find({ isDeleted: false })
      .populate('creator')
      .sort({ datePosted: -1 })
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No posts found' });
      });
  },

  editPost: async (req, res) => {
    Post.update({ _id: req.body._id }, { $set: { postBody: req.body.postBody, photo: req.body.photo } }, { upsert: true })
      .then((post) => {
        Post.find({ isDeleted: false })
          .populate('creator')
          .sort({ datePosted: -1 })
          .then((posts) => {
            res.json(posts);
          })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },

  likePost: async (req, res) => {
    Post.update({ _id: req.body._id }, { $set: { liked: req.body.liked } }, { upsert: false })
      .then((post) => {
        Post.find({ isDeleted: false })
          .populate('creator')
          .sort({ datePosted: -1 })
          .then((posts) => {
            res.json(posts);
          })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },

  commentPost: async (req, res) => {
    Post.update({ _id: req.body._id }, { $set: { comments: req.body.comments } }, { upsert: true })
      .then((post) => {
        Post.find({ isDeleted: false })
          .populate('creator')
          .sort({ datePosted: -1 })
          .then((posts) => {
            res.json(posts);
          })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },

  deleteComment: async (req, res) => {
    Post.update({ _id: req.body._id }, { $set: { comments: req.body.comments } }, { upsert: true })
      .then((post) => {
        Post.find({ isDeleted: false })
          .populate('creator')
          .sort({ datePosted: -1 })
          .then((posts) => {
            res.json(posts);
          })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },
  likeComment: async (req, res) => {
    Post.update({ _id: req.body._id }, { $set: { comments: req.body.comments } }, { upsert: true })
      .then((post) => {
        Post.find({ isDeleted: false })
          .sort({ datePosted: -1 })

          .populate('creator')
          .then((posts) => {
            res.json(posts);
          })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },

  updateComments: async (req, res) => {
    Post.update({ _id: req.body._id }, { $set: { disableComments: req.body.disableComments } }, { upsert: true })
      .then(() => {
        Post.find({ _id: { $or: req.body.postIds }, isDeleted: false })
          .populate('creator')
          .sort({ datePosted: -1 })
          .then((posts) => { res.json(posts); });
      })
      .catch(() => {
        res.json({ msg: 'Something went wrong' });
      });
  },

  sharePost: async (req, res) => {
    res.json({ msg: 'Sharing Works' });
  }
};
