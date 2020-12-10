const { MessageEmbed } = require('discord.js')
const Blasphemator = require('../Blasphemator')
module.exports = {
    name: 'list',
    description: 'list all blasphemies in database',
    execute(message, args, otherArgs) {
        Blasphemator.init(otherArgs.configPath)
        let formattedEntities = ''
        Blasphemator.data.entities.forEach(element => {
            formattedEntities = formattedEntities.concat(element + '\n')
        });
        let formattedDerogatories = ''
        Blasphemator.data.derogatories.forEach(element => {
            formattedDerogatories = formattedDerogatories.concat(element + '\n')
        });
        const embed = new MessageEmbed()
            .addFields({ name: 'Divinità', value: formattedEntities }, { name: 'Insulti', value: formattedDerogatories })
        message.reply(embed)
    },
};