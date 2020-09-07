module.exports = {
    name: 'play',
    description: 'Play requested song',
    
    async execute(message, args) {
        if(!message.guild) return;

        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            if (args[0] == null) {
                return;
            }
            else {
                if(!(args[0].startsWith('https://'))) {
                    message.member.voice.channel.leave();
                    return message.reply('je n\'ai pas réussi à trouver la vidéo demandée, veuillez vérifier l\'URL de la vidéo.');
                }
                const ytdl = require('ytdl-core');

                const connexion = await message.member.voice.channel.join();

                const dispatcher = connexion.play(ytdl(args[0], { filter: 'audioonly' }), {
                    volume: 0.33,
                });

                dispatcher.on('error', () => {
                    message.reply('je n\'ai pas réussi à trouver la vidéo demandée, veuillez vérifier l\'URL de la vidéo.');
                    message.member.voice.channel.leave();
                })

                dispatcher.on('finish', () => { // événement fin musique on déconnecte le bot
                    dispatcher.destroy();
                    message.member.voice.channel.leave();
                    message.channel.send('J\'ai quitté le salon vocal !');
                })
            }
        } 
        else {
            message.reply('vous devez d\'abord rejoindre un canal vocal !');
        }
    } 
}