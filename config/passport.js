const JwtStrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    }));

    // Configure the Facebook strategy for use by Passport.
    passport.use(new FacebookStrategy({
            clientID: 214169345888026,
            clientSecret: "5d8e491306cab26469a334e6ec973bbf",
            callbackURL: "http://localhost:5000/login/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
};