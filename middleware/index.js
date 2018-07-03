function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}

function requiresLogIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  const err = new Error('You need to be logged in');
  err.status = 401;
  return next(err);
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogIn = requiresLogIn;
