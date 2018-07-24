const mongoose = require('mongoose');
// const JWT = require('jsonwebtoken');
const Marketplace = require('../models/marketplace');

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
    if (req.body.category) search = { ...search, category: { $regex: (req.body.category) } };
    if (req.body.location) search = { ...search, location: req.body.location };
    if (req.body.search) search = { ...search, description: { $regex: (req.body.search) }, title: { $regex: (req.body.search) } };
    Marketplace.find({ ...search })
      .populate('creator')
      .then((post) => { res.json(post); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No posts found' });
      });
  },
  getUserPost: async (req, res) => {
    res.json({ msg: 'getUserPost Works' });
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
  }
};
