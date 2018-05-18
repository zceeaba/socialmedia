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
  },
  addconv:function(request,response){
    var data_from_client=request.params.all();
    if (!request.isSocket) {
        return response.badRequest();
      }
    if (request.isSocket && request.method=="POST"){
      Messages.create(data_from_client).exec(function(data_from_client){
        console.log(data_from_client);
        Messages.publish({
          id:data_from_client.id,, message : data_from_client.message , user:data_from_client.user
        });
      })
    }
    else if (request.isSocket){
      Messages.watch(request.socket);
      console.log( 'User subscribed to ' + request.socket.id );
    }
  }

};
