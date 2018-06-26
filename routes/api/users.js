const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

// Load User model
const User = require('../../models/User');

// @riyte   GET api/users/register
// @desc    Register
// @access  Public
router.post('/register', (req, res) => {
  const {errors, isValid } = validateRegisterInput(req.body);

  // Check for validity
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if(user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash)=> {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});



module.exports = router;