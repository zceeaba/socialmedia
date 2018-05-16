/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    username: {
      type: 'string',
      unique: true,
      required: true,
      maxLength: 12,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    surname: {
      type: 'string',
      required: true,
    },
  },

  // to toggle if password is displayed
  customToJSON: function() {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['password'])
  },

  beforeCreate: function(user, proceed) {
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        return proceed(err);
      } else {
        user.password = hash;
        return proceed();
      }
    });
  }

};
