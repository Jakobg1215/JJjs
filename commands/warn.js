module.exports = {
    name: 'warn',
    execute(Message) {
        const Caller = Message.guild.members.cache.get(Message.author.id);
        if (Caller.hasPermission('KICK_MEMBERS')) {
            if (Message.mentions.users.first()) {
                const Target = Message.guild.members.cache.get(Message.mentions.users.first().id);
                const Role0 = Target.roles.cache.has('758445227102044220');
                const Role1 = Target.roles.cache.has('758445332828389467');
                const Role2 = Target.roles.cache.has('758445396032356382');
                if (!(Role0) && !(Role1) && !(Role2)) {
                    Message.delete();
                    Target.roles.add(Message.guild.roles.cache.get('758445227102044220'));
                    Message.reply(`${Target} has been warned!`).then(Message => Message.delete({ timeout: 3000 }));
                } else {
                    if (Role0 && !(Role1) && !(Role2)) {
                        Message.delete();
                        Target.roles.add(Message.guild.roles.cache.get('758445332828389467'));
                        Message.reply(`${Target} has been warned!`).then(Message => Message.delete({ timeout: 3000 }));
                    } else {
                        if (Role0 && Role1 && !(Role2)) {
                            Message.delete();
                            Target.roles.add(Message.guild.roles.cache.get('758445396032356382'));
                            Message.reply(`${Target} has been warned!`).then(Message => Message.delete({ timeout: 3000 }));
                        } else {
                            if (Role0 && Role1 && Role2) {
                                Message.delete();
                                Message.reply(`${Target} already has 3 warning!`).then(Message => Message.delete({ timeout: 3000 }));
                            };
                        };
                    };
                };
            } else {
                Message.delete();
                Message.reply('Please specify a member.').then(Message => Message.delete({ timeout: 3000 }));
            };
        } else {
            Message.delete();
            Message.reply('You don\'t have the permissions to do that.').then(Message => Message.delete({ timeout: 3000 }));
        };
    }
};