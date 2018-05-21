
(function (io) {

  // as soon as this file is loaded, connect automatically,
  var socket = io.sails.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {
    // Listen for Comet messages from Sails
    socket.on('messages', function messageReceived(message) {

      log('New comet message received :: ', message);

    });


    log(
        'Socket is now connected and globally accessible as `socket`.\n' +
        'e.g. to send a GET request to Sails, try \n' +
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  window.socket = socket;


  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }


})(

  window.io

);
