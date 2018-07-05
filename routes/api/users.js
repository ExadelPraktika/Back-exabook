const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const keys = require('../../config/keys');

//Passport Config
require('../../config/passport')(passport);

// GET /
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

// GET /login
router.get('/login', (req, res, next) => {
    return res.render('login', { title: 'Log in'});
});

//POST /login
router.post('/login', (req, res, next) => {
    if(req.body.email && req.body.password){
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if(error || !user){
                const err = new Error('Wrong email or password');
                err.status = 401;
                return next(err);
            } else {
                jwt.sign(user.toJSON(), keys.secretOrKey, {expiresIn: 10080/*seconds*/ });
                console.log('Logged in as ' + user.name);
                return res.redirect('/profile');
            }
        });
    }else {
        const err = new Error('Email and password required');
        err.status = 401;
        return next(err);
    }
});

//GET logout
router.get('/logout', (req, res, next) => {
   if(req.session){
       req.logout();
       req.session.destroy(err => {
           if(err){
               return next(err);
           } else {
               return res.redirect('/');
           }
       });
   }
});

// GET /register
router.get('/register', (req, res, next) => {
    return res.render('register', { title: 'Sign up'});
});
// POST /register
router.post('/register', (req, res, next) => {
    if(
        req.body.name &&
        req.body.email &&
        req.body.password &&
        req.body.confirmPassword
    ){
        //password match check
        if(req.body.password !== req.body.confirmPassword){
            const err = new Error('Passwords Do Not Match');
            err.status = 400;
            return next(err);
        }
        //creating the object that we are going to insert into mongo
        const userData = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        };
        User.create(userData,(error,user)=>{
            if(error){
                return next(error);
            }else{
                console.log("New user registered");
                jwt.sign(user.toJSON(), keys.secretOrKey, {expiresIn: 10080/*seconds*/ });
                return res.redirect('/profile');
            }
        });
    }else{
        const err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});

//GET /profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next)=>{
    return res.render('profile', { title: 'Profile', id: req.user._id});
});

//GET /login/facebook
router.get('/login/facebook', passport.authenticate('facebook', {scope: ["email"]}));

//GET /login/facebook/return
router.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res, next) => {
        // Successful authentication, redirect to profile.
        console.log("Logged in with facebook");
        res.redirect('/dg');
    });

module.exports = router;
