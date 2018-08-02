const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create a schema
const messageSchema = new Schema({

  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  },
  channelName: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model
const Message = mongoose.model('message', messageSchema);

// Export the model
module.exports = Message;
