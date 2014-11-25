/**
 * Created by nhn on 2014/11/25.
 */

var socketIO = require("socket.io"),
    io, guestNumber = 1,
    nickNames = {},
    namesUsed = [],
    currentRoom = {};

// 链接处理逻辑
exports.listen = function (server) {
    io = socketIO.listen(server);
    io.set("log level", 1);
    io.sockets.on('connection', function (socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, "lobby");
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);

        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames, namesUsed);
    });
}

// 分配用户昵称
function assignGuestName(socket, guestNumber, nikeNames, namesUsed) {
    var name = 'Guest' + guestNumber;

    nickNames[socket.id] = name;

    socket.emit('nameResult', {
        success: true,
        name: name
    });

    namesUsed.push(name);

    return guestNumber + 1;
}

// 进入聊天室相关逻辑
function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room: room});
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    });

    var usersInRoom = io.sockets.clients(room);

    if (usersInRoom.length > 1) {
        var usersInRoomSummary = "Users currently in " + room + ':';

        for (var index in usersInRoom) {
            var usersSocketId = usersInRoom[index].id;

            if (usersSocketId != socket.id) {
                usersInRoomSummary += ",";
            }

            usersInRoomSummary += nickNames[usersSocketId];
        }
    }

    usersInRoomSummary += ".";
    socket.emit('message:' + {text: usersInRoomSummary});
}

// 更名请求处理逻辑
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('nameAttempt', function (name) {

        if (name.indexOf("Guest") == 0) {
            socket.emit('nameResult', {
                success: false,
                message: 'Names cannot begin with "Guest".'
            });
        } else {
            if (namesUsed.indexOf(name) == -1) {
                var previousName = nickNames[socket.id],
                    previousNameIndex = namesUsed.indexOf(previousName);

                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex];

                socket.emit('nameResult', {
                    success: true,
                    name: name
                });

                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: previousName + ' is now known ad ' + name + '.'
                });
            } else {
                socket.emit('nameResult', {
                    success: false,
                    message: name + ' is already in use.'
                });
            }
        }
    });
}

// 发送聊天消息
function handleMessageBroadcasting(socket) {
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        });
    })
}

// 创建房间
function handleRoomJoining(socket) {
    socket.on('join', function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    })
}

// 用户断开链接
function handleClientDisconnection(socket) {
    socket.on('disconnect', function () {
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);

        delete namesUsed[nameIndex];
        delete nickNames[nameIndex];
    })
}