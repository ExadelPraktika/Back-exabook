const mongoose = require('mongoose');
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
    Post.findById(req.params.id)
      .then((post) => { res.json(post); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No post found' });
      });
  },

  // DELETE
  // deletePost: async (req, res) => {
  //       Post.findById(req.params.id)
  //         .then((post) => {
  //           post.remove().then(() => {
  //             res.json({ success: true });
  //           })
  //             .catch((err) => {
  //               res.status(404).json({ nopostfound: 'No event found' });
  //             });
  //           return true;
  //         });
  // }

  // SOFT DELETE
  deletePost: async (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        post.update({ isDeleted: true }).then(() => {
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
      .sort({ datePosted: -1 })
      .then((posts) => { res.json(posts); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No posts found' });
      });
  },

  editPost: async (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        post.editing = !post.editing;
        post.update({ editing: post.editing }).then(() => {
          res.json({ success: true });
        })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No event found' });
          });
      });
  },

  likePost: async (req, res) => {
    res.json({ msg: 'Liking Works' });
  },

  sharePost: async (req, res) => {
    res.json({ msg: 'Sharing Works' });
  }

};
