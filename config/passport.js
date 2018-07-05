const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));

    passport.use(new FacebookStrategy({
            clientID: keys.clientID,
            clientSecret: keys.clientSecret,
            callbackURL: 'http://localhost:5000/login/facebook/return',
            profileFields: ['id', 'displayName', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            // In this example, the user's Facebook profile is supplied as the user
            // record.  In a production-quality application, the Facebook profile should
            // be associated with a user record in the application's database, which
            // allows for account linking and authentication with other identity
            // providers.
            if(profile.emails[0]) {
                User.findOneAndUpdate(
                    { email: profile.emails[0] },
                    {
                        name: profile.displayName || profile.username,
                        email: profile.emails[0].value
                    },
                    {
                        upsert: true
                    },
                    done
                );
            } else {
                const noEmailError = new Error("Your email privacy settings prevent you from signing into Exabook.");
                done(noEmailError, null);
            }
            return done(null, profile);
        }));
    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};