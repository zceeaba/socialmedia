/**
 * Messages.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    roomname: {
      type: 'string',
      required: true,
    },
    username: {
      type: 'string',
      required: true
    },

    content: {
      type: 'string',
      required: true
    },

  },
};
