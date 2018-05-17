/**
 * Messages.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    chatroom_id: {
        type: 'number',
        required: true
    },

    username: {
        type: 'string',
        required: true
    },

    content: {
        type: 'string',
        required: true
    },

    room:{
      model:'ChatRooms',
    }

  },


};
