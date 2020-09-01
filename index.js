const fs = require('fs'); // "gestionnaire" des dossiers
const Discord = require('discord.js');

const {token, prefix, activity} = require("./config/config.json");

const bot = new Discord.Client({disableMentions: 'everyone'});
bot.commands = new Discord.Collection(); // Création de la collection des commandes du bot

const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Lecture des commandes dans le dossier {./commands}, qu'on stocke dans le tableau commandsFiles[]

for (const file of commandsFiles) // pour chaque fichier dans commandsFiles[], {file} fichier courant
{
    const command = require(`./commands/${file}`); // On inclu la commande à notre index.js
    bot.commands.set(command.name, command); // On ajoute le nom de la commande & la commande en elle même dans la collection.
}

bot.on('ready', () => {
    console.log(`Connecté en tant que [${bot.user.tag}] !`);

    bot.user.setPresence({ activity: { name: `${activity.name}`, type: `${activity.type}` }, status: `${activity.status}`});
});

bot.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return; // Si le message ne contient que le prefix ou est envoyé par un bot on ne fait rien

    const args = msg.content.slice(prefix.length).split(/ +/); // On récupère ce qu'il y a après le prefix soit le nom de la commande et si présence d'arguments (ex: mentions) on stocke aussi
    const command = args.shift().toLowerCase(); // On récupère la commande (nom) avec shift() 

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(msg, args, bot); // Si présence de la commande on execute avec les paramètres nécessaires, on envoi l'objet bot pour certaines fonctionnalitées (avatar du bot par exemple)
    } catch (error) {
        console.log(error);
        msg.reply(`il y a eu un problème avec la commande \`\`${command}\`\` !`);
    }
})

// (arrêt vidéo 10:05)

bot.login(token);