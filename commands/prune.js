module.exports = {
    name: 'prune',
    description: "Delete a given number of messages",
    execute(message, args) {
        const amount = parseInt(args[0]) + 1; // On converti l'argument en entier, soit ici le nombre de messages à supprimer

        if(isNaN(amount)) {
            return message.reply('le nombre saisi est invalide !');
        }
        else if(amount < 1 || amount >= 100) {
            return message.reply('veuillez saisir un nombre compris entre 1 & 100 !')
        }

        if(amount > 2){
            msgToSay = 'messages ont étés supprimés';
        }
        else {
            msgToSay = 'message a été supprimé';
        }


        message.channel.bulkDelete(amount)
            .then(messages => message.channel.send(`**${messages.size - 1}** ${msgToSay}`));
    }
}