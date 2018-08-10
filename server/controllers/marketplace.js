const mongoose = require('mongoose');
// const JWT = require('jsonwebtoken');
const Marketplace = require('../models/marketplace');
const User = require('../models/user');

mongoose.set('debug', true);

module.exports = {
  test: async (req, res) => {
    res.json({ msg: 'Marketplace Works' });
  },
  getMarketplace: async (req, res) => {
    Marketplace.find()
      .populate('creator')
      .then((posts) => { res.json(posts); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No posts found' });
      });
  },
  getSearchedPosts: async (req, res) => {
    let search = {};
    if (req.body.max) search = { price: { $gte: req.body.min, $lt: req.body.max } };
    if (req.body.category) search = { ...search, category: new RegExp(req.body.category, 'i') };
    if (req.body.location) search = { ...search, location: req.body.location };
    if (req.body.search) {
      search = {
        ...search,
        $or: [{
          description: new RegExp(req.body.search, 'i'),
          title: new RegExp(req.body.search, 'i')
        }]
      };
    }
    Marketplace.find({ ...search })
      .populate('creator')
      .then((post) => { res.json(post); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No posts found' });
      });
  },
  getUserPost: async (req, res) => {
    Marketplace.find({ creator: req.params.id })
      .populate('creator')
      .then((posts) => { res.json(posts); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No posts found' });
      });
  },
  createPost: async (req, res) => {
    const newPost = new Marketplace({
      creator: req.user.id,
      title: req.body.title,
      description: req.body.description,
      images: req.body.images,
      liked: req.body.liked,
      category: req.body.category,
      timePosted: req.body.timePosted,
      price: req.body.price,
      location: req.body.location
    });
    newPost.save().then((post) => {
      res.json(post);
    });
  },
  deletePost: async (req, res) => {
    Marketplace.findById(req.params.postId)
      .then((post) => {
        if (post.creator.toString() !== req.params.userId) {
          return res.status(401).json({ notauthorized: 'User not authorize' });
        }
        // Moving the posts average rating to users market profile rating
        if (Object.keys(post.rating).length !== 0) {
          let averageRating = 0;
          Object.keys(post.rating).forEach((rate) => {
            averageRating += post.rating[rate];
          });
          averageRating /= Object.keys(post.rating).length;
          User.findOneAndUpdate({ _id: req.params.userId }, { $push: { marketRating: averageRating } }, { upsert: true }).then(() => {
            post.remove().then(() => {
              res.json({ success: true });
            })
              .catch((err) => {
                res.status(404).json({ nopostfound: 'No post found' });
              });
          })
            .catch((err) => {
              res.status(404).json({ nopostfound: 'No user found' });
            });
        }
        // finishing adding users market rating
        post.remove().then(() => {
          res.json({ success: true });
        })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No post found' });
          });
      });
  },
  updateRating: async (req, res) => {
    Marketplace.update({ _id: req.body._id }, { $set: { rating: req.body.rating } }, { upsert: true })
      .then((post) => {
        Marketplace.find()
          .populate('creator')
          .then((posts) => { res.json(posts); })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },
  updateLikes: async (req, res) => {
    Marketplace.update({ _id: req.body._id }, { $set: { liked: req.body.liked } }, { upsert: true })
      .then((post) => {
        Marketplace.find()
          .populate('creator')
          .then((posts) => { res.json(posts); })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },
  updateComments: async (req, res) => {
    Marketplace.update({ _id: req.body._id }, { $set: { disableComments: req.body.disableComments } }, { upsert: true })
      .then((post) => {
        Marketplace.find()
          .populate('creator')
          .then((posts) => { res.json(posts); })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },
  addComment: async (req, res) => {
    Marketplace.update({ _id: req.body._id }, { $set: { comments: req.body.comments } }, { upsert: true })
      .then((post) => {
        Marketplace.find()
          .populate('creator')
          .then((posts) => { res.json(posts); })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },
  deleteComment: async (req, res) => {
    Marketplace.update({ _id: req.body._id }, { $set: { comments: req.body.comments } }, { upsert: true })
      .then((post) => {
        Marketplace.find()
          .populate('creator')
          .then((posts) => { res.json(posts); })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  },
  likeComment: async (req, res) => {
    Marketplace.update({ _id: req.body._id }, { $set: { comments: req.body.comments } }, { upsert: true })
      .then((post) => {
        Marketplace.find()
          .populate('creator')
          .then((posts) => { res.json(posts); })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No posts found' });
          });
      })
      .catch((err) => {
        res.json({ msg: 'Something went wrong' });
      });
  }
};
