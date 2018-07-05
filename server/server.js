const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./configuration/config').mongoURI;
const dbTest = require('./configuration/config').mongoURITest;

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(db, { useMongoClient: true });
} else {
  mongoose.connect(dbTest, { useMongoClient: true });
}

const app = express();

app.use(passport.initialize());
app.use(passport.session());
// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Start the server
const port = process.env.PORT || 3001;
app.listen(port);
console.log(`Server listening at ${port}`);

// refactored code for easier test and feature scale
