/**
 * Created by nhn on 2014/11/25.
 */

var Chat = function (socket) {
    this.socket = socket;
};

// 发送聊天消息
Chat.prototype.sendMessage = function (room, text) {
    var message = {
        room: room,
        text: text
    };
    this.socket.emit('message', message);
}

// 房间变更请求
Chat.prototype.changeRoom = function (room) {
    this.socket.emit('join', {
        newRoom: room
    });
}

// 处理聊天命令
Chat.prototype.processCommand = function (command) {
    var words = command.split(" "), message = false,
        command = words[0].substring(1, words[0].length).toLowerCase();

    switch (command) {
        case 'join':
            words.shift();
            var room = words.join(' ');

            this.changeRoom(room);
            break;
        case 'nick':
            words.shift();
            var name = words.join(' ');

            this.socket.emit('nameAttempt',name);
            break;
        default:
            message = 'Unrecognized command.';
            break;
    }

    return message;
}