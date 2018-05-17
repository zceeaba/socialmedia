/**
 * EventsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createevent:function(request,response){
      eventname=request.param("eventname");
      eventtype=request.param("eventtype");
      eventdate=request.param("eventdate");
      eventstart=request.param("eventstart");
      eventend=request.param("eventend");
      console.log(eventname,eventtype);
      events.create({eventname:eventname,eventtype:eventtype,
      eventdate:eventdate,
      eventstart:eventstart,eventend:eventend}).exec(console.log);
      return response.view('pages/homepage');
    },
    findevents: function(req, res) {
    events.find().exec(function(err, eventslist) {
      var listofevents = eventslist;
      console.log(listofevents)
      res.view("pages/eventslist",{listofevents:listofevents});
    });
  },
    connecteventtouser:function(request,response){
      eventid=request.param("events");
      user=request.param("user");
      console.log("hallelujah")
      events.find({id:eventid}).exec(function(err, eventobject) {
        User.find({id:user}).exec(function(err, userobject) {
          console.log(user,eventid);
          User.addToCollection(user, 'events').members([eventid]).exec(console.log);
          console.log("babababee")
        });
      });
      return response.view('pages/homepage');
    },
    showevents:function(request,response){
      userid=request.param("userid");
      User.find({id:userid}).exec(function(err,userobject){
        User.find({id:userid}).populate('events').exec(function(err,eventobject){
          console.log("hallelujah")
          console.log(userid)
          console.log(eventobject[0].events)
          return response.view('pages/showevents',{eventobj:eventobject});
        });
      })
    }
};
