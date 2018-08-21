const express = require('express');

const app = express();
const server = require('http').createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const io = require('socket.io')(server);

const clients = {};
const db = require('./configuration/config').mongoURI;
const dbTest = require('./configuration/config').mongoURITest;

io.on('connection', (socket) => {
  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);
  });
});

io.sockets.on('connection', (socket) => {
  socket.on('add-user', (data) => {
    clients[data.email] = {
      socket: socket.id
    };
  });

  socket.on('private-message', (data) => {
    console.log(`Sending: ${data.message} to ${data.email}`);
    if (clients[data.email]) {
    // io.sockets.connected[clients[data.email].socket].emit('add-message', data);
    // io.sockets.connected[clients[data.email1].socket].emit('add-message', data);
      io.in(clients[data.email].socket).emit('add-message', data);
      io.in(clients[data.email1].socket).emit('add-message', data);
    } else {
      console.log(`User does not exist: ${data.email}`);
    }
  });

  socket.on('disconnect', () => {
    Object.keys(clients).forEach((k) => {
      if (clients[k].socket === socket.id) {
        console.log('aleliuja');
        delete clients[k];
      }
    });
  });
});
// Start the server
const port = process.env.PORT || 3001;
server.listen(port);

console.log(`Server listening at ${port}`);

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(dbTest, { useMongoClient: true });
} else {
  mongoose.connect(db, { useMongoClient: true });
}

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/events', require('./routes/events'));
app.use('/marketplace', require('./routes/marketplace'));
app.use('/chat', require('./routes/chat'));

// refactored code for easier test and feature scale
