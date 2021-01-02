const { MessageEmbed } = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'help',
    group: 'help',
    active: true,
    description: 'display all commands',
    execute(message, args, otherArgs) {
        const commandFiles = fs.readdirSync(otherArgs.dirname + '\\commands');
        const commands = []
        for (const commandFile of commandFiles) {
            commands.push(require(`${otherArgs.dirname}\\commands\\${commandFile}`))
        }
        const askedCommand = commands.find(c => { return c.name === args[0] })
        if (askedCommand) {
            const embed = new MessageEmbed()
                .setColor(0xbdbdbd)
                .setTitle(askedCommand.name)
                .setDescription(askedCommand.description)
            message.reply(embed)
            return
        }
        if (args[0]) {
            message.reply(`il comando non esiste, prova ${process.env.PREFIX} help`)
            return
        }
        let fields = []
        for (const [groupKey, groupValue] of Object.entries(groupBy(commands, "group"))) {
            let value = ""
            for (const command of groupValue) {
                if (command.active) {
                    value += `:white_check_mark: - `
                } else {
                    value += `:x: - `
                }
                value += `${command.name}\n`

            }
            fields.push({ name: groupKey, value: value })
        }
        const embed = new MessageEmbed()
            .setColor(0xbdbdbd)
            .addFields(
                fields
            )
        message.reply(embed)

        function groupBy(collection, property) {
            const groups = collection.reduce((groups, item) => ({
                ...groups,
                [item[property]]: [...(groups[item[property]] || []), item]
            }), {});
            return groups;
        }
    }
}