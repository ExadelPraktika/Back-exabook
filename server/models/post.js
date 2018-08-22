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
  liked: {
    type: Array,
    default: []
  },
  shares: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  photo: {
    type: String
  },
  disableComments: {
    type: Boolean,
    default: false
  },
  comments: [
    {
      text: {
        type: String,
        required: true
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      name: {
        type: String
      },
      likes: {
        type: Array,
        default: []
      },
      avatar: {
        type: String
      }
    }
  ]
});

const Posts = mongoose.model('posts', postSchema);

module.exports = Posts;
