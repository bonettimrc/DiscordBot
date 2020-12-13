const Discord = require('discord.js')
module.exports = {
    name: 'orario',
    description: 'send current 4x schedule in chat',
    execute(message) {
        const attachment = new Discord.MessageAttachment('./img/orario.png');
        message.channel.send(attachment);
    }
}