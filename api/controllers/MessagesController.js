/**
 * MessagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  do: function(request, response){
        if(request.socket===true){
            var secret = request.param('secret');
            User.find({username: 'jay'}, function(err, bobs) {
            if (err) {return response.serverError(err);}

            // Tell the secret to every client who is subscribed to these users,
            // except for the client that made this request in the first place.
            // Note that the secret is wrapped in a dictionary with a `verb` property -- this is not
            // required, but helpful if you'll also be listening for events from Sails blueprints.
            User.publish(_.pluck(bobs, 'id'), {
              verb: 'published',
              theSecret: secret
            }, request);
            console.log(_.pluck(bobs, 'id'));
            return response.send();
          });

        }
    }
}
