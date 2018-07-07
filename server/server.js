/**
 * Main server file which handles users
 *
 * @author Jeffery Russell
 * 2-22-18
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = 3000;

var players = {};

var blocks = [];


var Player = function()
{

};

io.on('connection', function(socket)
{
    var p = new Player();

    console.log("user connected");

    var initialState = new Object();
    initialState.players = players;
    initialState.blocks = blocks;

    socket.emit('connected', initialState);

    socket.on('move', function(data)
    {

    });

    socket.on('shoot', function(data)
    {

    });

    socket.on('disconnect', function()
    {
        console.log("user disconnected");
    })

});

http.listen(PORT, function()
{
    console.log('listening on *:3000');
});
