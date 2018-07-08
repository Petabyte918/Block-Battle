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


var sockets = {};

var blocks = [];


var Player = function()
{
    var name;

    var x = 350;
    var y = 350;

    var upB= false;
    var downB = false;
    var leftB = false;
    var rightB = false;
};


var blocks = function(xx, yy, ownerName)
{
    var x = xx;
    var y = yy;
    var owner = ownerName;

    //1 up
    //2 left
    //3 right
    //4 down
    var direction;
};


var update = function(command, object)
{
    Object.keys(sockets).forEach(function(key)
    {
        console.log(players[key]);
        sockets[key].emit(command, object);
    });
};


io.on('connection', function(socket)
{
    var p = new Player();

    console.log("user connected");

    var initialState = new Object();
    initialState.players = players;
    initialState.blocks = blocks;

    socket.emit('connected', initialState);

    socket.on('keyDown', function(data)
    {
        console.log("keydown");

        if(data.direction == 38)
        {
            //up
            p.upB = true;
        }
        else if (data.direction == 40)
        {
            //down
            p.downB = true;
        }
        else if (data.direction == 39)
        {
            //right
            p.leftR = true;
        }
        else if (data.direction == 37)
        {
            //left
            p.leftB = true;
        }
        else if (data.direction == 32)
        {
            //space
        }

        var object = new Object();
        object.name = p.name;
        object.player = p;

        update("updateClient", object);
    });

    socket.on('keyUp', function(data)
    {
        console.log("keyUp");

        if(data.direction == 38)
        {
            //up
            p.upB = false;
        }
        else if (data.direction == 40)
        {
            //down
            p.downB = false;
        }
        else if (data.direction == 39)
        {
            //right
            p.rightB = false;
        }
        else if (data.direction == 37)
        {
            //left
            p.leftB = false;
        }
    });

    socket.on('die', function(data)
    {
        players.remove(p);
    });


    socket.on('disconnect', function()
    {
        console.log("user disconnected");
    });

    socket.on('register', function(data)
    {
        console.log(data);
        p.name = data;
        players[data] = p;
        sockets[data] = socket;
        p.x = 300;
        p.y = 300;
    });
});

http.listen(PORT, function()
{
    console.log('listening on *:3000');
});
