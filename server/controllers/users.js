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
      name: name,
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
    return User.findById(req.params.id)
      .then((user) => {
        res.status(200).json({ user });
      });
  },

  // Get list of users, where user is not in a friend list
  showAll: function (req, res) {
    User.find({ $and: [{ friends: { $not: { $elemMatch: { _id: req.params.id } } } }, { _id: { $ne: req.params.id } }] }) // {friends: 1, name: 1 }
      .then((resp) => {
        res.status(200).json({ resp });
      });
  },

  addAvatar: async (req, res) => {
    // const { avatar } = req.body;
    User.findById(req.params.id)
      .then((user) => {
        user.avatar = req.body.avatar;
        user.save();
        res.status(200).json({ user });
      });
  },

  initFriendReq: function (req, res) {
    User.requestFriend({ _id: req.params.send }, { _id: req.params.receive }, (err, results) => {
      if (err) {
        //  console.log(`Try to delete from server-side controller: ${req.id}`);
        //  console.log(err);
      } else {
        res.json(results);
      }
    });
  },
  displayFriends: function (req, res) {
    User.getFriends({ _id: req.params.id }, (err, results) => {
      if (err) {
        // console.log(`Try to delete from server-side controller: ${req.id}`);
        // console.log(err);
      } else {
        res.json(results);
      }
    });
  },
  deleteFriend: function (req, res) {
    User.findOneAndUpdate(
      { _id: req.params.send },
      {
        $pull: { friends: { _id: req.params.receive } }
      },
    );
    User.findOneAndUpdate(
      { _id: req.params.receive },
      {
        $pull: { friends: { _id: req.params.send } }
      },
      (result) => {
        res.json(result);
      }
    );
  },
  refreshUser: async (req, res) => {
    User.findById(req.body.userId)
      .populate('creator')
      .then((user) => { res.json(user); })
      .catch((err) => {
        res.status(404).json({ nouserfound: 'No user found' });
      });
  },
  removeBoughtItems: async (req, res) => {
    User.findOneAndUpdate({ _id: req.body.userId }, { $set: { sellingTo: req.body.sellingTo } }, { upsert: true })
      .then((user) => { res.json(user); })
      .catch((err) => {
        res.status(404).json({ nouserfound: 'No user found' });
      });
  },
  removeSoldItem: async (req, res) => {
    User.find({ buyingFrom: { $elemMatch: { sellingItem: req.body.postId } } })
      .then((users) => {
        users.forEach((user) => {
          const buyingFrom = user.buyingFrom.filter((seller) => {
            return seller.sellingItem !== req.body.postId;
          });
          User.update({ _id: user._id }, { $set: { buyingFrom: buyingFrom } }, { upsert: true }).then(() => {
            res.json({ msg: 'success' });
          })
            .catch((err) => {
              res.status(404).json({ error: 'Failed to update' });
            });
        });
        res.json(users);
      })
      .catch((err) => {
        res.status(404).json({ nousersfound: 'No users found' });
      });
  },
  secret: async (req, res) => {
    res.json({ secret: 'resource' });
  }
};
