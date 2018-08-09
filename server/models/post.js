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
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  editing: {
    type: Boolean,
    default: false
  }
});

const Posts = mongoose.model('posts', postSchema);

module.exports = Posts;
