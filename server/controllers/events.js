const mongoose = require('mongoose');
// const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Events = require('../models/events');
const validateEventInput = require('./validation/events');

mongoose.set('debug', true);

module.exports = {
  test: async (req, res) => {
    res.json({ msg: 'Events Work' });
  },

  getEvents: async (req, res) => {
    Events.find({ end: { $gte: new Date(Date.now() - 1000 * 7200) } })
      .populate(
        ['creator', 'going.user']
      )
      .sort({ start: 'asc' })
      .then((events) => { res.json(events); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No events found' });
      });
  },
  getEvent: async (req, res) => {
    Events.findById(req.params.id)
      .populate(
        ['creator', 'going.user', 'comments.user']
      )
      .then((event) => { res.json(event); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No event found' });
      });
  },
  getUserEvents: async (req, res) => {
    Events.find({ $or: [{ 'going.user': req.params.id }, { creator: req.params.id }] })
      .populate(
        ['creator', 'going.user']
      )
      .sort({ start: 'asc' })
      .then((events) => { res.json(events); })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No events found' });
      });
  },
  createEvent: async (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);
    if (!isValid) {
      console.log(errors);
      return res.status(400).json(errors);
    }

    const newEvent = new Events({
      creator: req.user.id,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      start: req.body.start,
      photo: req.body.photo,
      coordLat: req.body.coordLat,
      coordLng: req.body.coordLng,
      end: req.body.end
    });
    return newEvent.save().then((event) => {
      res.json(event);
    });
  },
  deleteEvent: async (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        Events.findById(req.params.idas)
          .then((event) => {
            if (event.creator.toString() !== req.params.id) {
              return res.status(401).json({ notauthorize: 'User not authorize' });
            }
            event.remove().then(() => {
              res.json({ success: true });
            })
              .catch((err) => {
                res.status(404).json({ nopostfound: 'No event found' });
              });
            return true;
          });
      });
  },
  goingToEvent: async (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        Events.findById(req.params.idas)
          .then((event) => {
            if (event.going.filter((going) => { return going.user.toString() === req.params.id; }).length > 0) {
              return res.status(400).json({ alreadyliked: 'already going' });
            }
            event.going.unshift({ user: req.params.id });
            return event.save().then((resevent) => { return res.json(resevent); });
          })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No event found' });
          });
      });
  },
  cancelGoing: async (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        Events.findById(req.params.idas)
          .then((event) => {
            if (event.going.filter((going) => { return going.user.toString() === req.params.id; }).length === 0) {
              return res.status(400).json({ alreadyliked: 'already not going' });
            }
            const removeIndex = event.going
              .map((item) => { return item.user.toString(); })
              .indexOf(req.params.id);
            event.going.splice(removeIndex, 1);
            return event.save().then((kazkas) => { return res.json(kazkas); });
          })
          .catch((err) => {
            res.status(404).json({ nopostfound: 'No event found' });
          });
      });
  },

  commentEvent: async (req, res) => {
    Events.findById(req.params.id)
      .then((event) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          photo: req.body.photo,
          user: req.user.id
        };
        event.comments.unshift(newComment);
        return event.save().then((eventas) => { return res.json(eventas); });
      })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No event found' });
      });
  },
  deleteComment: async (req, res) => {
    Events.findById(req.params.id)
      .then((event) => {
        if (event.comments.filter((comment) => { return comment._id.toString() === req.params.comment_id; })
          .length === 0) {
          return res.status(404).json({ commentnotexists: 'Comment does not exist' });
        }
        const removeIndex = event.comments
          .map((item) => { return item._id.toString(); })
          .indexOf(req.params.comment_id);

        event.comments.splice(removeIndex, 1);
        return event.save().then((eventas) => { return res.json(eventas); });
      })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No event found' });
      });
  },

  commentLike: async (req, res) => {
    console.log('working', req.params.id, req.params.idas, req.params.commentID);
    Events.findOneAndUpdate(
      { _id: req.params.idas, comments: { $elemMatch: { _id: req.params.commentID, 'likes.user': { $ne: req.params.id } } } },
      { $push: { 'comments.$.likes': { user: req.params.id } } },
      (result) => {
        res.json(result);
      }
    );
  },
  deleteLike: async (req, res) => {
    console.log('working', req.params.id, req.params.idas, req.params.commentID);
    Events.findOneAndUpdate(
      { _id: req.params.idas, comments: { $elemMatch: { _id: req.params.commentID } } },
      {
        $pull: { 'comments.$.likes': { user: req.params.id } }
      },
      (result) => {
        res.json(result);
      }
    );
  }
};
// $push: {
//   'comments.$.likes': {
//     $each: [],
//     $slice: { $indexOfArray: [['comments.$.likes'], req.params.id] }
//   }
// }
