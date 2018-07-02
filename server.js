const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Body parser middleware
// Use application-level middleware for common functionality
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// DB Config
const db = require('./config/keys').mongoURI;

// Set Connection to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Passport Config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);

app.get('/', (req, res) => res.render('home', { user: req.user }));

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });
app.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('profile', { user: req.user });
    });

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));