const passport = require('passport');

module.exports = {

  login: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }

      req.logIn(user, function (err) {
        if (err) res.send(err);
        return res.redirect('/')
      });
    })(req, res);
  },

  logout: function (req, res) {
    req.logout();
    setTimeout(function () {
      return res.redirect('login');
    }, 2000);
  },

  signup: function (req, res, next) {
    // create user and store in a database
    User.create(req.allParams(), function (err, user) {
      if (err) {

      } return next(err);

      return res.redirect('login')
    });
  }

};
