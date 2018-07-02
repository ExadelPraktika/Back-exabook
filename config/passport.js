const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = passport => {
    passport.use(new FacebookStrategy({
            clientID: 214169345888026,
            clientSecret: '5d8e491306cab26469a334e6ec973bbf',
            callbackURL: 'http://localhost:5000/login/facebook/return'
        },
        function(accessToken, refreshToken, profile, cb) {
            // In this example, the user's Facebook profile is supplied as the user
            // record.  In a production-quality application, the Facebook profile should
            // be associated with a user record in the application's database, which
            // allows for account linking and authentication with other identity
            // providers.
            return cb(null, profile);
        }));
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
};