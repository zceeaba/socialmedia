const passport = require('passport');
module.exports = {
login: function(req, res) {
    passport.authenticate('local', function(err, user, info){
      if((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }
req.logIn(user, function(err) {
        if(err) res.send(err);
        console.log(user)
        return res.view('pages/userpage', {
          message: info.message,
          user:user})
        /*
        return res.send({
          message: info.message,
          user
        });
        */
      });
    })(req, res);
  },
logout: function(req, res) {
    req.logout();
    res.redirect('login');
  }
};
