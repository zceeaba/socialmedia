const passport = require('passport');

module.exports = {

  login: function (req, res) {
    passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        return res.view('pages/login', {errMessage: info.message});
      }

      req.logIn(user, (err) => {
        if (err) {
          return res.view('pages/login', {errMessage: err});
        }
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
    User.create(req.allParams(), (err, user) => {
      if (err) {
        return res.view('pages/signup', {errMessage: err});
      }
      return res.redirect('login');
    });
  }

};
