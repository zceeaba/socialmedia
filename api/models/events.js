module.exports = {
  attributes: {
    eventname: {
      type: 'string',
      unique: true,
      required: true,
      maxLength: 12,
    },
    eventtype: {
      type: 'string',
      unique: true,
      required: true,
    },
    eventdate: {
      type: 'string',
      unique: true,
      required: true,
    },
    eventstart: {
      type: 'string',
      unique: true,
      required: true,
    },
    eventend: {
      type: 'string',
      unique: true,
      required: true,
    },

    // Add a reference to User
    Users: {
      collection: 'User',
      via: 'events'
    }
  }
};
