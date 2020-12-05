module.exports = {
    name: 'say',
    execute(Message, arguments) {
        if (arguments < 1) return Message.reply('Nothing to say?').then(Message => Message.delete({ timeout: 5000 }));
        else Message.reply(arguments.slice(0).join(' '));
    }
};