module.exports = {
    name: 'number',
    execute(Message, arguments) {
        if (arguments[0] == undefined) {
            arguments[0] = 1;
        };
        if (arguments[1] == undefined) {
            arguments[1] = 10;
        };
        if (!isNaN(arguments[0]) && !isNaN(arguments[1])) {
            if (arguments[0] == arguments[1]) {
                Message.channel.send(arguments[0])
            } else {
                if (arguments[0] > arguments[1]) {
                    Message.channel.send(Math.floor(Math.random() * arguments[0] + arguments[1]));
                } else {
                    Message.channel.send(Math.floor(Math.random() * arguments[1] + arguments[0]));
                };
            }
        } else {
            Message.reply('Please use numbers.');
        };
    }
};