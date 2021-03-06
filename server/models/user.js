const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const friends = require('mongoose-friends');

const { Schema } = mongoose;

// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    name: {
      type: String
    },
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    name: {
      type: String
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    name: {
      type: String
    }
  },
  friends: {
    type: Array,
    default: []
  },
  marketRating: {
    type: Array,
    default: []
  },
  sellingTo: {
    type: Array,
    default: []
  },
  buyingFrom: {
    type: Array,
    default: []
  }

  // friends: [
  //   {
  //     friend: {
  //       type: Schema.Types.ObjectId,
  //       ref: 'User'
  //     },
  //     status: {
  //       type: String
  //     }
  //   }
  // ]
});

userSchema.plugin(friends({ pathName: 'friends' }));
userSchema.pre('save', async function (next) {
  try {
    if (this.method !== 'local') {
      next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
