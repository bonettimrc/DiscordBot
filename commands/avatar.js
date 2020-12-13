const Discord = require('discord.js')
module.exports = {
    name: 'avatar',
    description: 'sends the profile picture of the user that used the command',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Ecco il tuo avatar:')
            .setImage(message.author.avatarURL())
        message.channel.send(embed)
    }
}