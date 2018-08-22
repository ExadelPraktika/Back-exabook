const Chat = require('../models/chat');

module.exports = {
  newConversation: async (req, res, next) => {
    const author = req.body.authorName;
    const msg = req.body.message;
    Chat.findOne({
      $and: [
        {
          $or: [
            { userA: req.body.senderID },
            { userB: req.body.senderID }
          ]
        },
        {
          $or: [
            { userA: req.body.recieverID },
            { userB: req.body.recieverID }
          ]
        }
      ]
    })
      .then((chat) => {
        if (chat) {
          const newMsg = {
            author: author,
            message: msg
          };
          chat.messages.unshift(newMsg);
          return chat.save().then((chatObj) => { return res.json(chatObj); });
        }
        const newGroup = new Chat({
          userA: req.body.recieverID,
          userB: req.body.senderID,
          messages: [{
            author: author,
            message: msg
          }]
        });
        return newGroup.save().then((event) => {
          res.json(event);
        });
      })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No event found' });
      });
  },
  getConversation: async (req, res, next) => {
    Chat.findOne({
      $and: [
        {
          $or: [
            { userA: req.body.senderID },
            { userB: req.body.senderID }
          ]
        },
        {
          $or: [
            { userA: req.body.recieverID },
            { userB: req.body.recieverID }
          ]
        }
      ]
    })
      .then((chat) => {
        return res.json(chat);
      })
      .catch((err) => {
        res.status(404).json({ nopostfound: 'No event found' });
      });
  }
};

// Chat.find({ $and: [{ userA: { $in: [recipient, sender] } }, { userB: { $in: [recipient, sender] } }] })
