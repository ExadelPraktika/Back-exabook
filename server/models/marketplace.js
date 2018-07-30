const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create a schema
const marketSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  avatar: {
    type: String,
    default: ''
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
    type: Boolean,
    default: false
  },
  timePosted: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  rating: {
    type: String,
    default: 'Rate'
  },
  disableComments: {
    type: Boolean,
    default: false
  }
});

// Create a model
const Marketplace = mongoose.model('marketplace', marketSchema);

// Export the model
module.exports = Marketplace;
