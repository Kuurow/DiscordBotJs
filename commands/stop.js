module.exports = {
    name: 'stop',
    description: 'Disconnect the bot from the voice channel',
    
    async execute(message, args) {
        if(!message.guild) return;

        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            const connexion = await message.member.voice.channel.join();

            if (connexion) {
                message.member.voice.channel.leave();
            }
        } 
        else {
            message.reply('vous devez d\'abord rejoindre un canal vocal !');
        }
    } 
}