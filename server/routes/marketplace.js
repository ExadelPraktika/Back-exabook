const router = require('express-promise-router')();
const passport = require('passport');
const MarketplaceController = require('../controllers/marketplace');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/test')
  .get(passportJWT, MarketplaceController.test);

router.route('/search')
  .post(passportJWT, MarketplaceController.getSearchedPosts);

router.route('/')
  .get(passportJWT, MarketplaceController.getMarketplace);

router.route('/')
  .post(passportJWT, MarketplaceController.createPost);

router.route('/my/:id')
  .get(passportJWT, MarketplaceController.getUserPost);

module.exports = router;
