module.exports = {
    name: 'ping',
    description: 'Reply to the user with Pong',
    
    execute(message) {
        message.reply('Pong! :ping_pong:');
    }
}