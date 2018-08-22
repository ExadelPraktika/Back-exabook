const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create a schema
const chatSchema = new Schema({
  userA: {
    type: String,
    required: true
  },
  userB: {
    type: String,
    required: true
  },
  messages: [
    {
      author: {
        type: String
      },
      message: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]


});

// Create a model
const Chat = mongoose.model('Chat', chatSchema);

// Export the model
module.exports = Chat;
