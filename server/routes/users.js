// const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

// const router1 = express.Router();
require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');

const UsersController = require('../controllers/users');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

  router.route('/signin')
  .post(validateBody(schemas.loginSchema), passportSignIn, UsersController.signIn);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

router.route('/get/:id')
  .get(UsersController.getUser);

router.route('/avatar/:id')
  .put(UsersController.addAvatar);

router.route('/friends/delete/:send/:receive')
  .put(UsersController.deleteFriend);

router.route('/friends/add/:send/:receive')
  .put(UsersController.initFriendReq);

router.route('/friends/search/:id')
  .get(UsersController.showAll);

router.route('/friends/:id')
  .get(UsersController.displayFriends);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

/* router.route('/refresh')
  .post(passportJWT, UsersController.refreshUser); */

module.exports = router;
