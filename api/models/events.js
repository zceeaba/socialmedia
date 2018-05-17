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
      required: true,
    },
    eventdate: {
      type: 'string',
      required: true,
    },
    eventstart: {
      type: 'string',
      required: true,
    },
    eventend: {
      type: 'string',
      required: true,
    },

    // Add a reference to User
    Users: {
      collection: 'User',
      via: 'events'
    }
  }
};
