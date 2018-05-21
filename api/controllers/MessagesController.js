/**
 * MessagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  chooseroomname: function(request, response) {
    if (request.user) {
      User.find({
        id: request.user.id
      }).exec((err, userobject) => {
        User.find({
          id: request.user.id
        }).populate('events').exec((err, eventobject) => {
          return response.view('pages/chooseroomname', {
            eventobj: eventobject
          });
        });
      });
    } else {
      response.redirect('/');
    }
  },

  subscribe: function(req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req.socket, 'messages');

    return res.ok();
  },
  _config: {}


};
