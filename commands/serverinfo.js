module.exports = {
    name: 'serverinfo',
    execute(Message, Discord) {
        const MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(Message.author.username, Message.author.avatarURL())
            .setFooter(`${Message.guild.owner.user.username} owns the server`)
            .setColor('#0x00ff00')
            .setTitle(Message.guild.name)
            .setDescription('server info')
            .setThumbnail(Message.guild.iconURL())
            .addFields(
                {
                    name: 'Emojis',
                    value: Message.guild.emojis.cache.size,
                    inline: true
                },
                {
                    name: 'Region',
                    value: Message.guild.region,
                    inline: true
                },
                {
                    name: 'AFK',
                    value: Message.guild.afkTimeout,
                    inline: true
                },
                {
                    name: 'Description',
                    value: Message.guild.description,
                    inline: true
                },
                {
                    name: 'Verification Level',
                    value: Message.guild.verificationLevel,
                    inline: true
                },
                {
                    name: 'Channels',
                    value: Message.guild.channels.cache.size,
                    inline: true

                },
                {
                    name: 'id',
                    value: Message.guild.id,
                    inline: true
                },
                {
                    name: 'Members',
                    value: Message.guild.memberCount,
                    inline: true
                },
                {
                    name: 'Roles',
                    value: Message.guild.roles.cache.size,
                    inline: true
                },
                {
                    name: 'Started At',
                    value: Message.guild.createdAt,
                    inline: true
                },
            );
        Message.channel.send(MessageEmbed);
    }
};