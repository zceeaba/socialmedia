/**
 * ChatroomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createchatroom:function(request,response,eventname,user){
    //eventname=request.param("eventname");
    var exists=false;
    ChatRooms.find({roomname:eventname}).exec(function(err,roomobject){
      exists=true;
    });
    if(exists===false){
      newroomname=eventname;
      ChatRooms.create({roomname:newroomname}).exec(console.log);
      events.find({eventname:newroomname}).exec(function(err, eventobject){
        ChatRooms.find({roomname:newroomname}).exec(function(err, roomobject){
          User.addToCollection(user.id, 'events').members([eventobject[0].id]).exec(console.log);
          User.addToCollection(user.id, 'rooms').members([roomobject[0].id]).exec(console.log);
        });
      });
      return response.view('pages/chatroom',{roomname:eventname})
    }
  }

};
