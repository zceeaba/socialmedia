/**
 * EventsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  createevent:function(request,response){
    if(request.user){
      var ChatroomController = require('./ChatroomController');
      user=request.user;
      eventname=request.param("eventname");
      eventtype=request.param("eventtype");
      eventdate=request.param("eventdate");
      eventstart=request.param("eventstart");
      eventend=request.param("eventend");
      events.create({eventname:eventname,eventtype:eventtype,
      eventdate:eventdate,
      eventstart:eventstart,eventend:eventend}).exec(console.log);
      ChatroomController.createchatroom(request,response,eventname,user);
    }
    else{
      response.redirect('/');
    }
    },
  findevents: function(request, response) {
    if(request.user){
      events.find().exec(function(err, eventslist) {
        var listofevents = eventslist;
        response.view("pages/eventslist",{listofevents:listofevents});
      });
    }
    else{
      response.redirect('/');
    }
  },
    connecteventtouser:function(request,response){
      if (request.user) {
        eventid=request.param("events");
        user=request.param("user");
        console.log("hallelujah")
        events.find({id:eventid}).exec(function(err, eventobject) {
          User.find({id:user}).exec(function(err, userobject) {
            console.log(user,eventid);
            User.addToCollection(user, 'events').members([eventid]).exec(console.log);
          });
        });
        return response.view('pages/homepage');
      }
      else{
        response.redirect('/');
      }
    },
    showevents:function(request,response){
      if (request.user) {
      User.find({id:request.user.id}).exec(function(err,userobject){
        User.find({id:request.user.id}).populate('events').exec(function(err,eventobject){
          return response.view('pages/showevents',{eventobj:eventobject});
        });
      })
    }
    else{
      response.redirect('/');
    }
},
}
