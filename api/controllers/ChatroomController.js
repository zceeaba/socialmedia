/**
 * ChatroomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createchatroom:function(request,response,eventname){
    //eventname=request.param("eventname");
    var exists=false;
    ChatRooms.find({roomname:eventname}).exec(function(err,roomobject){
      exists=true;
    });
    if(exists===false){
      newroomname=eventname;
      ChatRooms.create({roomname:newroomname}).exec(console.log);
      return response.view('pages/chatroom',{roomname:eventname})
    }
  }

};
