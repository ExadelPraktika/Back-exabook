const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false //if false exclude from the query
    }

// TODO: ADD MORE information to user model
});




module.exports = User = mongoose.model('users', UserSchema);