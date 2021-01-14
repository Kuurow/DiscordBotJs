const Discord = require('discord.js');
module.exports = {
    name: 'serverinfo',
    desc: 'Displays server information',

    execute(message, args, bot) {
        
        if(!args[0]) {
            const guild = message.guild;

            let guildIconUrl = guild.iconURL({dynamic: true});
            
            if(guildIconUrl.endsWith('webp')) // Si l'icone du serveur n'est pas un gif il sera en webp donc on regarde si c'est le cas
            { 
                guildIconUrl = guildIconUrl.replace('webp','png'); // Si webp on converti le lien en png
            }

            const messageAuthorMention = `<@!${message.author.id}>`;
            const creationDateGuild = new Date (guild.createdTimestamp);

            const embed = new Discord.MessageEmbed() 
                .setColor('#b55aec')
                .setTitle('**Informations relatives au serveur :**')
                .setDescription(` \`\`\`${guild.name}\`\`\` \u200B`) // \u200B - "Espace à largeur zéro"
                .setThumbnail(`${guildIconUrl}`)
                .addFields(
                    { name: '*Nombre de membres :*', value: `${guild.memberCount}`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true }, // Spacer
                    { name: '*Propriétaire :*', value: `${guild.owner}`, inline: true },
                    { name: '*Nombre de rôles :*', value: `${(guild.roles.cache.size - 1)}`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true }, // Spacer
                    { name: '*Date de création :*', value: `${creationDateGuild.toUTCString()}`, inline: true}
                )
                .setTimestamp()
                .setFooter('Raiden Mei', `${bot.user.avatarURL({format: 'png'})}`);

            return message.channel.send({content: messageAuthorMention, embed: embed});
        }
        else {
            return;
        }
    }
}