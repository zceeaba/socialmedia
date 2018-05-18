var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337';
// ...


/*
io.socket.get('/messages', function serverResponded (body, JWR){
  // Whenever a `user` event is received, do something.
  console.log(io.socket.isConnected())
  console.log('Sails responded with: ', body);
  console.log('with headers: ', JWR.headers);
  console.log('and with status code: ', JWR.statusCode);

  io.socket.on('user', function(msg) {
  console.log(msg.verb)
  if (msg.verb === 'published') {
  console.log('Got a secret only Bobs can hear:', msg.theSecret);
  }
  // else if (msg.verb === 'created') { ... }
  // else if (msg.verb === 'updated') { ... }
  });
})
*/
