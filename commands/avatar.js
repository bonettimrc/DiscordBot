const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'avatar',
    group: 'inutilities',
    active: true,
    description: 'sends the profile picture of the user that used the command',
    execute(message) {
        const embed = new MessageEmbed()
            .setColor(0xbdbdbd)
            .setTitle('Ecco il tuo avatar:')
            .setImage(message.author.avatarURL())
        message.channel.send(embed)
    }
}