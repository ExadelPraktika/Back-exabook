<<<<<<< HEAD
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Post schema
const postSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postBody: {
    type: String
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  }
});

const Posts = mongoose.model('posts', postSchema);

module.exports = Posts;
=======
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Post schema
const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postBody: {
    type: String
  },
  datePosted: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  }
});

const Posts = mongoose.model('posts', postSchema);

module.exports = Posts;
>>>>>>> 04693f714486e87519954ec8e38d9e6c7971f6f0
