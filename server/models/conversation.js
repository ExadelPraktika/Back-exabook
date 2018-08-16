const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create a schema
const conversationSchema = new Schema({

  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  channelName: {
    type: String
  }
});

// Create a model
const Conversation = mongoose.model('conversation', conversationSchema);

// Export the model
module.exports = Conversation;
