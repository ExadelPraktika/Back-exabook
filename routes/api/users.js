const express = require('express');
const passport = require('passport');
const User = require('../../models/user');
const mid = require('../../middleware/index');

const router = express.Router();

// Passport Config
require('../../config/passport')(passport);

// GET

router.get('/', (req, res) => res.render('index', { title: 'Home' }));

// GET /login
router.get('/login', mid.loggedOut, (req, res) => res.render('login', { title: 'Log in' }));

// POST /login
router.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      if (error || !user) {
        const err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      }
      req.session.userId = user._id;
      return res.redirect('/profile');
    });
  }
  const err = new Error('Email and password required');
  err.status = 401;
  return next(err);
});

// GET logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  }
});

// GET /register
router.get('/register', mid.loggedOut, (req, res) => res.render('register', { title: 'Sign up' }));
// POST /register
router.post('/register', (req, res, next) => {
  if (
    req.body.name
    && req.body.email
    && req.body.password
    && req.body.confirmPassword
  ) {
    // password match check
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords Do Not Match');
      err.status = 400;
      return next(err);
    }
    // creating the object that we are going to insert into mongo
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      }
      console.log('New user registered');
      req.session.userId = user._id;
      return res.redirect('/profile');
    });
  }
  const err = new Error('All fields required');
  err.status = 400;
  return next(err);
});

// GET /profile
router.get('/profile', mid.requiresLogIn, (req, res, next) => {
  User.findById(req.session.userId)
    .exec((error, user) => {
      if (error) {
        return next(error);
      }
      return res.render('profile', { title: 'Profile', name: user.name });
    });
});

// GET /login/facebook
router.get('/login/facebook', passport.authenticate('facebook'));

// GET /login/facebook/return
router.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to profile.
    console.log('Logged in with facebook');
    res.redirect('/profile');
  });


module.exports = router;
