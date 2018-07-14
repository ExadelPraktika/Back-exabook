const router = require('express-promise-router')();
const passport = require('passport');
const EventsController = require('../controllers/events');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/test')
  .get(passportJWT, EventsController.test);

router.route('/:id')
  .get(passportJWT, EventsController.getEvent);

router.route('/')
  .get(passportJWT, EventsController.getEvents);

router.route('/my/:id')
  .get(passportJWT, EventsController.getUserEvents);

router.route('/')
  .post(passportJWT, EventsController.createEvent);

router.route('/:id/:idas')
  .delete(passportJWT, EventsController.deleteEvent);

router.route('/going/:id/:idas')
  .post(passportJWT, EventsController.goingToEvent);

router.route('/ungoing/:id/:idas')
  .post(passportJWT, EventsController.cancelGoing);

module.exports = router;
