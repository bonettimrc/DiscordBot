require('dotenv').config()
const fs = require('fs');
const Discord = require('discord.js');
const Blasphemator = require('./Blasphemator');

const client = new Discord.Client();
client.login(process.env.TOKEN);
//retrieve commands from commands dir
const commands = []
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.name] = command;
}
//setup of in-process args that the commands could need
const otherArgs = {
    "dirname": __dirname,
    "client": client
}

client.on('ready', () => {
    console.log('ready and running...');
    Blasphemator.init();
})
client.on('message', (message) => {
    //doesn't respond to bots
    if (message.author.bot) return;
    //handle blasphemy
    if (Blasphemator.blasphemyCheck(message.content)) {
        message.reply('nun se dice!');
        Blasphemator.processBlasphemy(message.guild.id, message.author.id);
    }
    //handle F in chat
    if (message.content.toLowerCase() === 'f') {
        const attachment = new Discord.MessageAttachment(__dirname + '/img/F.png');
        message.channel.send(attachment);
    }

    //if it can't possibly be a command return
    if (!message.content.startsWith(process.env.PREFIX)) return;
    //otherwise handle command
    let args = message.content.split(" ")
    const invokedCommandName = args[1].toLowerCase()

    if (!commands[invokedCommandName]) return
    try {
        commands[invokedCommandName].execute(message, args.slice(2), otherArgs)
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})
