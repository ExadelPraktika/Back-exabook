const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create a schema
const eventSchema = new Schema({
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
  location: {
    type: String
  },
  photo: {
    data: Buffer,
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  going: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model
const Events = mongoose.model('events', eventSchema);

// Export the model
module.exports = Events;
