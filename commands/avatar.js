module.exports = {
    name: 'avatar',
    description: 'Send an embed message with the profile pic of the user or a mentionned user', 
    
    execute(message, args, bot) {
        let nbrArgs = args.length; // On regarde il y a combien d'arguments (mentions)
        // console.log(`Nombre d'arguments (mentions) : ${nbrArgs}`);
        // console.log(`Mentions: ${args}`);

        if(nbrArgs === 0) { // Si 0 = pas de mention, renvoi de l'avatar de l'utilisateur
            return message.channel.send({
                "content": `<@!${message.author.id}>`,
                "embed": {
                    "color": '#b55aec',
                    "timestamp": new Date(),
                    "footer": {
                        "icon_url": `${bot.user.avatarURL({format: 'png'})}`,
                        "text": "Raiden Mei"
                    },
                    "image": {
                        "url": `${message.author.avatarURL({dynamic: true, size: 256})}`
                    },
                    "fields": 
                    [
                        {
                            "name": "Nom d'utilisateur :",
                            "value": `${message.author.tag}`,
                        },
                        {
                            "name": "URL de l'avatar :",
                            "value": `${message.author.avatarURL({dynamic: true})}`
                        }
                    ]
                }
            })
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

                return message.channel.send({
                    "content": `<@!${message.author.id}>`,

                    "embed": {
                        "color": '#b55aec',
                        "timestamp": new Date(),
                        "footer": {
                            "icon_url": `${bot.user.avatarURL({format: 'png'})}`,
                            "text": "Raiden Mei"
                        },
                        "image": {
                            "url": `${searchAvatarURLResized}`
                        },
                        "fields": [
                            {
                            "name": "Nom d'utilisateur :",
                            "value": `${searchedMentionnedMemberAvatar.tag}`
                            },
                            {
                            "name": "URL de l'avatar :",
                            "value": `${searchAvatarURL}`
                            }
                        ]
                    }
                })
            }
            else {
                return message.reply('utilisateur non reconnu, veuillez vérifier si la mention est correcte et réessayez.')
            }
        }
             
    }
}