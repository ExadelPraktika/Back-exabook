const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

const signToken = (user) => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
};

mongoose.set('debug', true);


module.exports = {
  signUp: async (req, res) => {
    const { name, email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ 'local.email': email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        name: name,
        password: password
      }
    });

    await newUser.save();

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    return res.status(200).json({ token });
  },

  signIn: async (req, res) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  getUser: async (req, res) => {
    console.log('params', req.params.id);
    return User.findById(req.params.id)
      .then((user) => {
        console.log(`this is user ${user}`);
        res.status(200).json({ user });
      });
  },

  secret: async (req, res) => {
    console.log('I managed to get here!');
    res.json({ secret: 'resource' });
  }
};
