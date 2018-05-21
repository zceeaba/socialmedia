/**
 * ChatroomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createchatroom: function(request, response, eventname, user) {
    //eventname=request.param("eventname");
    if (request.user) {
      var exists = false;
      ChatRooms.find({
        roomname: eventname
      }).exec((err, roomobject) => {
        exists = true;
      });
      if (exists === false) {
        newroomname = eventname;
        ChatRooms.create({
          roomname: newroomname
        }).exec(console.log);
        events.find({
          eventname: newroomname
        }).exec((err, eventobject) => {
          ChatRooms.find({
            roomname: newroomname
          }).exec((err, roomobject) => {
            User.addToCollection(user.id, 'events').members([eventobject[0].id]).exec(console.log);
            User.addToCollection(user.id, 'rooms').members([roomobject[0].id]).exec(console.log);
          });
        });
        User.findOne({
          id: request.user.id
        }).populate('rooms').exec((err, userobject) => {
          listofrooms = JSON.parse(JSON.stringify(userobject.rooms));
          return response.view('pages/homepage');
        });
      }
    } else {
      response.redirect('/');
    }
  },
  findchatrooms: function(request, response) {
    if (request.user) {
      var listofrooms;
      User.findOne({
        id: request.user.id
      }).populate('rooms').exec((err, userobject) => {
        listofrooms = JSON.parse(JSON.stringify(userobject.rooms));
        return response.view('pages/chatroomviews/chatroom', {
          username: request.user.username,
          listofrooms: listofrooms
        });
      });
    } else {
      response.redirect('/');
    }
  },

  connecteventtochatroom: function(request, response) {
    if (request.user) {
      var ChatroomController = require('./ChatroomController');

      /*
      var listofrooms;
      User.findOne({id:request.user.id}).populate('events').exec(function(err, userobject){
        listofevents=JSON.parse(JSON.stringify(userobject.events));
        for(var i=0;i<listofevents.length;i++){
            User.findOne({id:request.user.id}).populate('rooms').exec(function(err, userobject){
              listofrooms=JSON.parse(JSON.stringify(userobject.rooms));
              console.log(listofrooms,"list of rooms")
              for(var j=0;j<listofrooms.length;j++){
                if(listofrooms[j].roomname===listofevents[i].eventname){
                  console.log(listofrooms[j],listofevents[i])
                  console.log("found existing chat room")
                }
                else{
                  console.log("no existing chat room")
                  console.log(listofrooms[j].roomname,listofevents[i].eventname)
                  ChatRooms.create({roomname:listofevents[i].eventname});
                  ChatRooms.find({roomname:listofevents[i].eventname}).exec(function(err,roomobject){
                    User.addToCollection(request.user.id, 'rooms').members([roomobject[0].id]);
                  });
                }
            }
          })
          */
      ChatroomController.findchatrooms(request, response);
    } else {
      response.redirect('/');
    }
  },

  chat: function(req, res) {
    if (req.user) {
      roomname = req.param('events');
      res.view('pages/chat', {
        username: req.user.username,
        roomname: roomname
      });
    } else {
      res.redirect('/');
    }
  },

};
