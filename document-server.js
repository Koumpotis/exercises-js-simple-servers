let net = require('net');
let fs = require('fs');
let serverLog = require('./lib/serverLog');
let readlineSync = require('readline-sync');

let SERVER_PORT = 2004;

let server = net.createServer(function(connection) {
  let clientAddress = connection.remoteAddress;

  connection.write('Select the file you want to see the contents of.\n');

  connection.on('data', function(clientData) {
    let fileSelection = String(clientData).trimRight();

    let content = fs.readFileSync(`files/${fileSelection}`, 'utf-8');
    console.log(content);
    connection.write(content);
    connection.end();
  /*
    1. Read the contents of data/motd.txt into memory
    2. Send the contents do the client using connection.write(...)
    3. Close the connection
  */
  });
});

server.listen(SERVER_PORT, function() {
  serverLog('LISTENING', `MOTD server listening on port ${SERVER_PORT}`);
});
