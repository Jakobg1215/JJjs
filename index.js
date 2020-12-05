const Discord = require('discord.js');
const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });

const prefix = '~';
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

const { config } = require('dotenv');
config({
    path: __dirname + '/.env'
});

client.on('ready', () => {
    client.channels.cache.get('753264304052109392').send('I am on').then(Message => Message.delete({ timeout: 10000 }));
    client.user.setPresence(
        {
            status: 'online',
            activity: {
                type: 'WATCHING',
                name: 'over JJ\'s server'
            },
        },
    );
});

client.on('raw', (packet) => {
    const Guild = client.guilds.cache.get('689910219244830754');
    if (packet.t == 'MESSAGE_REACTION_ADD') {
        switch (packet.d.message_id) {
            case '781615060484227074':
                Guild.members.cache.get(packet.d.user_id).roles.add(Guild.roles.cache.get('781614576424058930'));
                break;
            case '783573744710582282':
                client.channels.cache.get('783571714948202496').messages.fetch(packet.d.message_id).then((Message) => Message.reactions.cache.get('📧').users.remove(packet.d.user_id));
                Guild.channels.create('ticket', {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: '760588948849950741',
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: packet.d.user_id,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: '689910219244830754',
                            deny: ['VIEW_CHANNEL'],
                        },
                    ],
                }).then((channel) => {
                    channel.setParent('783562381606387712', { lockPermissions: false });
                    channel.send(`<@${packet.d.user_id}> Hello, please wait for a <@&${'760588948849950741'}> to help you!`).then((Message) => {
                        Message.react('✅');
                        Message.pin();
                    });
                });
                break;
            default:
                const channel = client.channels.cache.get(packet.d.channel_id);
                channel.messages.fetch(packet.d.message_id).then(Message => Message.pinned).then(result => {
                    if (result && Guild.members.cache.get(packet.d.user_id).roles.cache.has('760588948849950741') && channel.parent == '783562381606387712') {
                        channel.delete();
                    };
                });
                break;
        };
    };
    if (packet.t == 'MESSAGE_REACTION_REMOVE') {
        switch (packet.d.message_id) {
            case '781615060484227074':
                Guild.members.cache.get(packet.d.user_id).roles.remove(Guild.roles.cache.get('781614576424058930'));
                break;
            default:
                break;
        };
    };
});

client.on('guildMemberAdd', GuildMember => {
    const quotes = ['It’s a-me, Mario!', 'FINISH HIM!', 'War…war never changes', 'War has changed', 'Praise the sun!', 'Stop right there, criminal scum!', 'Do a barrel roll!', 'Stay awhile and listen!', 'The cake is a lie'];
    const MessageEmbed = new Discord.MessageEmbed()
        .setTitle('Welcome to')
        .setDescription(GuildMember.guild.name)
        .setThumbnail(GuildMember.user.avatarURL())
        .setFooter(quotes[Math.floor(Math.random() * quotes.length)], GuildMember.guild.iconURL())
        .setColor('#0x00ff00')
        .addField('Name', GuildMember.user, true);
    client.channels.cache.get('689965431741874318').send(MessageEmbed);
});

client.on('message', async Message => {
    if (Message.author.bot || !Message.guild) return;
    if (Message.channel.id == '775184715275567145') {
        const gsheets = require('google-spreadsheet');
        const doc = new gsheets.GoogleSpreadsheet('REDACTED');
        await doc.useServiceAccountAuth(require('./data/sheetcreds.json'));
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.loadCells('A1');
        if (Message.content == sheet.getCell(0, 0).value) {
            sheet.getCell(0, 0).value = sheet.getCell(0, 0).value + 1;
            await sheet.saveUpdatedCells();
        } else {
            Message.delete();
        };
    };
    const blacklistedwords = ['fuck'];
    const whitelistedchannels = ['689911439225389105', '690618263356440586', '753264304052109392', '761212678470893588', '762147215958867998', '760378854413303918', '760372354646802502', '776958923882102804', '757321748210384907'];
    if (blacklistedwords.some(words => `${Message.content.toLocaleLowerCase()}`.includes(`${words}`)) && !(whitelistedchannels.includes(Message.channel.id))) {
        Message.delete();
        const MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(Message.author.username, Message.author.avatarURL())
            .setFooter(Message.channel.name)
            .setColor('#0x00ff00')
            .addFields(
                {
                    name: 'Message',
                    value: Message.content,
                    inline: true
                },
                {
                    name: 'Send on',
                    value: Message.createdAt,
                    inline: false
                },
            );
        client.channels.cache.get('761212678470893588').send(MessageEmbed);
    };

    if (Message.content.charAt(0) == '~') {
        const arguments = Message.content.slice(prefix.length).split(/ +/);
        const command = arguments.shift().toLocaleLowerCase();
        switch (command) {
            case 'help':
                client.commands.get('help').execute(Message, Discord, arguments);
                break;
            case 'ping':
                client.commands.get('ping').execute(Message, client);
                break;
            case 'number':
                client.commands.get('number').execute(Message, arguments);
                break;
            case 'serverinfo':
                client.commands.get('serverinfo').execute(Message, Discord);
                break;
            case 'warn':
                client.commands.get('warn').execute(Message);
                break;
            case 'say':
                client.commands.get('say').execute(Message, arguments);
                break;
            default:
                Message.reply('That command doesn\'t exist.').then(Message => Message.delete({ timeout: 5000 }));
        };
    };
});

client.login(process.env.TOKEN);