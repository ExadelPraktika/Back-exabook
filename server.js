const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const users = require('./routes/api/users');


const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Set Connection to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// use session for tracking
app.use(session({
  secret: 'exadel',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

// make user ID available in templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(path.join(__dirname, '/public')));

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public'));

// Routes

app.use('/', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
