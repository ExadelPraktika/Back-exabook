const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: 214169345888026,
    clientSecret: '5d8e491306cab26469a334e6ec973bbf',
    callbackURL: 'http://localhost:5000/login/facebook/return'
  },
  (accessToken, refreshToken, profile, cb) => cb(null, profile)));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
