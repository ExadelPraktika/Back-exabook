const router = require('express-promise-router')();
const passport = require('passport');
const PostsController = require('../controllers/posts');

require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/test')
  .get(passportJWT, PostsController.test);

router.route('/:id')
  .get(passportJWT, PostsController.getPost);

router.route('/edit/:id')
  .post(passportJWT, PostsController.editPost);

router.route('/')
  .get(passportJWT, PostsController.getFeed);

router.route('/delete/:id/')
  .get(PostsController.deletePost);

router.route('/')
  .post(passportJWT, PostsController.addPost);

router.route('/like/:id')
  .post(passportJWT, PostsController.likePost);

router.route('/share/:id')
  .post(passportJWT, PostsController.likePost);

module.exports = router;
