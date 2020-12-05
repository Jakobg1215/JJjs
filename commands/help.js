module.exports = {
    name: 'help',
    execute(Message, Discord, arguments) {
        if (arguments[0] == undefined) {
            const MessageEmbed = new Discord.MessageEmbed()
                .setAuthor(Message.author.username, Message.author.avatarURL())
                .setFooter('Jakobg1215#2245(428709307387740171) developed this bot!')
                .setColor('#0x00ff00')
                .setTitle('Command help')
                .setThumbnail(Message.guild.iconURL())
                .addFields(
                    {
                        name: 'Command',
                        value: 'help <command>',
                        inline: true
                    },
                    {
                        name: 'Description',
                        value: 'Gives you information about the command that was given.',
                        inline: false
                    },
                );
            Message.channel.send(MessageEmbed)
        } else {
            const MessageEmbed = new Discord.MessageEmbed()
                .setAuthor(Message.author.username, Message.author.avatarURL())
                .setFooter('Jakobg1215#2245(428709307387740171) developed this bot!')
                .setColor('#0x00ff00')
                .setTitle('Command help')
                .setThumbnail(Message.guild.iconURL())

            switch (arguments[0]) {
                case 'help':
                    MessageEmbed.addFields(
                        {
                            name: 'Command',
                            value: 'help <command>',
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: 'Gives you information about the command that was given.',
                            inline: false
                        },
                    );
                    Message.channel.send(MessageEmbed);
                    break;
                case 'ping':
                    MessageEmbed.addFields(
                        {
                            name: 'Command',
                            value: 'ping',
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: 'Gives you the latency of the bot.',
                            inline: false
                        },
                    );
                    Message.channel.send(MessageEmbed);
                    break;
                case 'number':
                    MessageEmbed.addFields(
                        {
                            name: 'Command',
                            value: 'number [Number1: int] [Number2: int]',
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: 'Gives you a random number between the numbers given.',
                            inline: false
                        },
                    );
                    Message.channel.send(MessageEmbed);
                    break;
                case 'serverinfo':
                    MessageEmbed.addFields(
                        {
                            name: 'Command',
                            value: 'serverinfo',
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: 'Gives info about this guild.',
                            inline: false
                        },
                    );
                    Message.channel.send(MessageEmbed);
                    break;
                case 'warn':
                    MessageEmbed.addFields(
                        {
                            name: 'Command',
                            value: 'warn <Member: Mentions> [Reason: String]',
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: 'Warns a member that was given.',
                            inline: false
                        },
                    );
                    Message.channel.send(MessageEmbed);
                    break;
                case 'say':
                    MessageEmbed.addFields(
                        {
                            name: 'Command',
                            value: 'say <Message: String>',
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: 'Makes the bot say what you put.',
                            inline: false
                        },
                    );
                    Message.channel.send(MessageEmbed);
                    break;
                default:
                    Message.reply('That command doesn\'t exist.').then(Message => Message.delete({ timeout: 5000 }));
            };
        };
    }
};