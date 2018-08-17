const router = require('express-promise-router')();
const passport = require('passport');
const EventsController = require('../controllers/events');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/test')
  .get(passportJWT, EventsController.test);

router.route('/getEvent')
  .post(passportJWT, EventsController.getEvent);

router.route('/')
  .get(passportJWT, EventsController.getEvents);

router.route('/myEvents')
  .post(passportJWT, EventsController.getUserEvents);

router.route('/')
  .post(passportJWT, EventsController.createEvent);

router.route('/:idas')
  .delete(passportJWT, EventsController.deleteEvent);

router.route('/going/:idas')
  .post(passportJWT, EventsController.goingToEvent);

router.route('/ungoing/:idas')
  .post(passportJWT, EventsController.cancelGoing);

router.route('/comment/:id')
  .post(passportJWT, EventsController.commentEvent);

router.route('/comment/:id/:comment_id')
  .delete(passportJWT, EventsController.deleteComment);

router.route('/comments/like/:idas/:commentID')
  .post(passportJWT, EventsController.commentLike);

router.route('/comments/unlike/:idas/:commentID')
  .post(passportJWT, EventsController.deleteLike);

module.exports = router;
