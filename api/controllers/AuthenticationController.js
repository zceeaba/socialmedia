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
        let out = err.message;
        if (out.includes('empty')) {
          out = 'Please fill out all fields';
        }
        else if (out.includes('minimum')) {
          out = 'Password must contain at least six characters';
        }
        else if (out.includes('valid email')) {
          out = 'Please insert a valid email address';
        }
        else if (out.includes('uniqueness')) {
          out = 'That username is already taken';
        }
        else {
          out = 'Better luck next time';
        }

        return res.view('pages/signup', {errMessage: out});
      }
      return res.redirect('login');
    });
  }

};
