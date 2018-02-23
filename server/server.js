/**
 * Main server file which handles users
 *
 * @author Jeffery Russell
 * 2-22-18
 */

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = 3000;

var players

io.on('connection', function(socket)
{

};

http.listen(PORT, function()
{
    console.log('listening on *:3000');
});
