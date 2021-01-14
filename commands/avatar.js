const Discord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: 'Send an embed message with the profile picture of the user or a mentionned user', 
    
    execute(message, args, bot) {
        let nbrArgs = args.length; // On regarde il y a combien d'arguments (mentions)
        const messageAuthorMention = `<@!${message.author.id}>`;

        if(nbrArgs === 0) { // Si 0 = pas de mention, renvoi de l'avatar de l'utilisateur
            
            let msgAuthorAvatarUrl = message.author.avatarURL();

            if (msgAuthorAvatarUrl.endsWith('.webp')) {
                msgAuthorAvatarUrl = message.author.avatarURL().replace('webp','png'); // Si webp on converti le lien en png
                msgAuthorAvatarDiplayed = message.author.avatarURL({size: 256}).replace('webp','png');
            } 
            else {
                msgAuthorAvatarDiplayed = message.author.avatarURL({size: 256});
            }

            const embed = new Discord.MessageEmbed() 
                .setColor('#b55aec')
                .addFields(
                    { name: 'Nom d\'utilisateur :', value: `${message.author.tag}`},
                    { name: 'URL de l\'avatar :', value: `${msgAuthorAvatarUrl}`}
                )
                .setImage(`${msgAuthorAvatarDiplayed}`)
                .setTimestamp()
                .setFooter('Raiden Mei', `${bot.user.avatarURL({format: 'png'})}`);

            return message.channel.send({content: messageAuthorMention, embed: embed});


        }
        else if(nbrArgs >= 2) { // S'il y a 2 ou plusieurs mention on ne fait rien
            return;
        }
        else 
        {
            const searchedMentionnedMemberAvatar = message.mentions.users.first(); // On récupère la mention

            if(searchedMentionnedMemberAvatar) {
                let searchAvatarURL = searchedMentionnedMemberAvatar.avatarURL(); // On récupère l'URL de l'avatar de la personne mentionnée

                if(searchAvatarURL.endsWith('webp')) // Si l'avatar n'est pas un gif il sera en webp donc on regarde si c'est le cas
                { 
                    searchAvatarURL = searchedMentionnedMemberAvatar.avatarURL().replace('webp','png'); // Si webp on converti le lien en png
                    searchAvatarURLResized = searchedMentionnedMemberAvatar.avatarURL({size: 256}).replace('webp','png'); // On redimensionne pour l'aperçu embed
                }
                else {
                    searchAvatarURL = searchedMentionnedMemberAvatar.avatarURL({dynamic: true}); // Si l'avatar est un gif
                }

                const embed = new Discord.MessageEmbed() 
                    .setColor('#b55aec')
                    .addFields(
                        { name: 'Nom d\'utilisateur :', value: `${searchedMentionnedMemberAvatar.tag}`},
                        { name: 'URL de l\'avatar :', value: `${searchAvatarURL}`}
                    )
                    .setImage(`${searchAvatarURLResized}`)
                    .setTimestamp()
                    .setFooter('Raiden Mei', `${bot.user.avatarURL({format: 'png'})}`);

                return message.channel.send({content: messageAuthorMention, embed: embed});
            }
            else {
                return message.reply('utilisateur non reconnu, veuillez vérifier si la mention est correcte et réessayez.')
            }
        }
    }
}