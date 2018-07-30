const router = require('express-promise-router')();
const passport = require('passport');
const MarketplaceController = require('../controllers/marketplace');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/test')
  .get(passportJWT, MarketplaceController.test);

router.route('/search')
  .post(passportJWT, MarketplaceController.getSearchedPosts);

router.route('/:userId/:postId')
  .delete(passportJWT, MarketplaceController.deletePost);

router.route('/')
  .get(passportJWT, MarketplaceController.getMarketplace);

router.route('/')
  .post(passportJWT, MarketplaceController.createPost);

router.route('/my/:id')
  .get(passportJWT, MarketplaceController.getUserPost);

router.route('/update')
  .post(passportJWT, MarketplaceController.update);

module.exports = router;
