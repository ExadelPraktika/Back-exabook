const router = require('express-promise-router')();
const passport = require('passport');
const ChatController = require('../controllers/chat');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });

// router.route('/test')
//  .get(passportJWT, ChatController.test);

router.route('/')
  .get(passportJWT, ChatController.getConversations);

router.route('/new')
  .post(passportJWT, ChatController.newConversation);

router.route('/leave')
  .post(passportJWT, ChatController.leaveConversation);

router.route('/reply')
  .post(passportJWT, ChatController.sendReply);

router.route('/privatemessages/:recipientId')
  .get(passportJWT, ChatController.getPrivateMessages);

router.route('/channel/:channelName')
  .get(passportJWT, ChatController.getChannelConversations);

router.route('/postchannel/:channelName')
  .post(passportJWT, ChatController.postToChannel);

router.route('/reply')
  .post(passportJWT, ChatController.sendReply);

router.route('/reply')
  .post(passportJWT, ChatController.sendReply);

module.exports = router;
