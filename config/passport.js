const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findOne(id, function(err, user) {
    cb(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, cb) {
  User.findOne({
    username: username
  }, function(err, user) {

    if (err) return cb(err);

    if (!user) return cb(null, false, {
      message: 'Username not found'
    });

    console.log(user.email, user.username);
    bcrypt.compare(password, user.password, function(err, res) {
      console.log(password, user.password);
      if (!res) return cb(null, false, {
        message: 'Invalid Password'
      });

      let userDetails = {
        email: user.email,
        username: user.username,
        id: user.id
      };

      return cb(null, userDetails, {
        message: 'Login Succesful'
      });
    });
  });
}));
