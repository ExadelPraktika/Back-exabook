const router = require('express-promise-router')();
const passport = require('passport');
const MessagesController = require('../controllers/messages');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });


router.route('/chat')
  .post(passportJWT, MessagesController.newConversation);
router.route('/chat/get')
  .post(passportJWT, MessagesController.getConversation);

module.exports = router;
