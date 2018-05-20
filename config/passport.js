const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne(id, (err, user) => {
    cb(err, user);
  });
});

passport.use(new LocalStrategy((username, password, cb) => {
  User.findOne({
    username: username
  }, (err, user) => {

    if (err) {
      return cb(err);
    }

    if (!user) {
      return cb(null, false, {
        message: 'Username not found'
      });
    }

    console.log(user.email, user.username);
    bcrypt.compare(password, user.password, (err, res) => {
      console.log(password, user.password);
      if (!res) {
        return cb(null, false, {
          message: 'Invalid Password'
        });
      }

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
