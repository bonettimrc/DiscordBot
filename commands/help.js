const { MessageEmbed } = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'help',
    description: 'display all commands',
    execute(message, args, otherArgs) {
        const commandFiles = fs.readdirSync(otherArgs.dirname + '\\commands');
        let commandNames = ""
        let commandDescriptions = ""
        for (const file of commandFiles) {
            const command = require(`${otherArgs.dirname}\\commands\\${file}`);
            commandNames += `${command.name}\n`
            commandDescriptions += `${command.description}\n`;
        }
        const embed = new MessageEmbed()
            .setColor(0xbdbdbd)
            .addFields(
                { name: 'Nome', value: commandNames, inline: true },
                { name: 'Descrizione', value: commandDescriptions, inline: true })
        message.reply(embed)
    }
}