require('dotenv').config()
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.login(process.env.TOKEN);
//retrieve commands from commands dir
const commands = []
const commandFiles = fs.readdirSync(`${__dirname}\\commands`);
for (const file of commandFiles) {
    const command = require(`${__dirname}\\commands\\${file}`);
    commands[command.name] = command;
}
const passiveCommands = []
//retrieve passiveCommands from passiveCommands dir
const passiveCommandFiles = fs.readdirSync(`${__dirname}\\passiveCommands`);
for (const file of passiveCommandFiles) {
    passiveCommands.push(require(`${__dirname}\\passiveCommands\\${file}`))
}
//setup of in-process args that the commands could need
const otherArgs = {
    "dirname": __dirname,
    "client": client
}
client.on('ready', () => {
    client.user.setActivity('calcoletto', { type: 'PLAYING' });

    console.log('ready and running...');
    console.log("----------------------------------------------------------------------------------");
    console.log("id | server | text channel");
    for (const [channelID, channelValue] of client.channels.cache) {
        if (channelValue.type == "text") {
            console.log(`${channelID} - ${channelValue.guild.name} - ${channelValue.name}`)
        }
    }
    console.log("----------------------------------------------------------------------------------");
    const askForId = () => {
        rl.question("id(type exit to stop command, type list to show all available servers):", (id) => {
            if (id == "exit") {
                return rl.close();
            }
            else if (id == "list") {
                console.log("----------------------------------------------------------------------------------");
                console.log("id | server | text channel");
                for (const [channelID, channelValue] of client.channels.cache) {
                    if (channelValue.type == "text") {
                        console.log(`${channelID} - ${channelValue.guild.name} - ${channelValue.name}`)
                    }
                }
                console.log("----------------------------------------------------------------------------------");
                askForId()
            }
            else {
                askForMsg(id)

            }
        })
    }
    const askForMsg = (id) => {
        rl.question("message(type exit to return at the id selection):", (msg) => {
            if (msg == "exit") {
                askForId()
                return;
            }
            else {
                client.channels.fetch(id).then(channel => { channel.send(msg) })
                askForMsg(id)
            }
        })
    }
    askForId()
})
client.on('message', (message) => {
    passiveCommands.forEach(passiveCommand => {
        passiveCommand.execute(message, otherArgs)
    });
    //if it can't possibly be a command return
    if (!message.content.toLowerCase().startsWith(process.env.PREFIX)) return;
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
