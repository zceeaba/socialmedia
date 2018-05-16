const passport = require('passport');

module.exports = {

  login: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
        // return res.redirect('error');
      }

      req.logIn(user, function (err) {
        if (err) return res.send(err);
        return res.redirect('/');
      });
    })(req, res);
  },

  logout: function (req, res) {
    req.logout();
    return res.redirect('login');
  },

  signup: function (req, res, next) {
    // create user and store in a database
    User.create(req.allParams(), function (err, user) {
      if (err) return res.send(err);
      return res.redirect('login');
    });
  }

};
