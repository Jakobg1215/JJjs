module.exports = {
    name: 'ping',
    execute(Message, client) {
        Message.channel.send(`${client.ws.ping}ms`)
    }
};