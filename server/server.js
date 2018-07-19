const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./configuration/config').mongoURI;
const dbTest = require('./configuration/config').mongoURITest;

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

// Sockets
io.on('connection', (socket) => {
  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);
  });
});
// refactored code for easier test and feature scale
