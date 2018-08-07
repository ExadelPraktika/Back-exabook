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

router.route('/update/rating')
  .post(passportJWT, MarketplaceController.updateRating);

router.route('/update/likes')
  .post(passportJWT, MarketplaceController.updateLikes);

router.route('/update/comments')
  .post(passportJWT, MarketplaceController.updateComments);

router.route('/comment')
  .post(passportJWT, MarketplaceController.addComment);

router.route('/delete/comment')
  .post(passportJWT, MarketplaceController.deleteComment);

router.route('/like/comment')
  .post(passportJWT, MarketplaceController.likeComment);

module.exports = router;
