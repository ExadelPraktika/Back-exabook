const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create a schema
const channelSchema = new Schema({
  channelName: {
    type: String,
    required: true
  }
});

// Create a model
const Channel = mongoose.model('channel', channelSchema);

// Export the model
module.exports = Channel;
