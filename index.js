require('dotenv').config()
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
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
    Blasphemator.init();
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
            else if (id == "list"){
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
    //doesn't respond to bots
    if (message.author.bot) return;
    //handle blasphemy
    if (Blasphemator.blasphemyCheck(message.content)) {
        message.reply('nun se dice!', { tts: true });
        Blasphemator.processBlasphemy(message.guild.id, message.author.id);
    }
    //handle F in chat
    if (message.content.toLowerCase() === 'f') {
        const attachment = new Discord.MessageAttachment(__dirname + '/img/F.png');
        message.channel.send(attachment);
    }
    //------------------------------------WORK IN PROGRESS-----------------------------------
    if (message.content.toLowerCase() === process.env.PREFIX + ' hello') {
        const { voice } = message.member
        if (!voice.channelID) {
            message.reply('Devi essere in un canale vocale per poter usare questo comando!');
            return
        }
        voice.channel.join().then((connection)=>{
            connection.play("ciao.mp3")
        })
    }

    if (message.content.toLowerCase() === process.env.PREFIX + ' dio') {
        const { voice } = message.member
        if (!voice.channelID) {
            message.reply('Devi essere in un canale vocale per poter usare questo comando!');
            return
        }
        voice.channel.join().then((connection)=>{
            connection.play("diomerda.mp3")
        })
    }

    if (message.content.toLowerCase() === process.env.PREFIX + ' vaffanculo') {
        const { voice } = message.member
        if (!voice.channelID) {
            message.reply('Devi essere in un canale vocale per poter usare questo comando!');
            return
        }
        voice.channel.join().then((connection)=>{
            connection.play("vaffanculo.mp3")
        })
    }
    //---------------------------------------------------------------------------------------
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
