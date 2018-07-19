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
