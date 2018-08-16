const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create a schema
const marketSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    default: []
  },
  liked: {
    type: Array,
    default: []
  },
  timePosted: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  rating: {
    type: Object,
    default: {}
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

// Create a model
const Marketplace = mongoose.model('marketplace', marketSchema);

// Export the model
module.exports = Marketplace;
