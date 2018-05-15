/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
//const bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
    username:{
      type:'string',
      unique:true,
      required:true,
      maxLength:12,
    },
    password:{
      type:'string',
      unique:true,
      required:true,
      maxLength:12,
    },
    email:{
      type:'string',
      isEmail:true,
      required:true,
      unique:true,
    },
    name:{
      type:'string',
      required:true,
    },
    surname:{
      type:'string',
      required:true,
    },
  },
  /*
  customToJSON: function() {
 return _.omit(this, ['password'])
  },
  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
*/
};