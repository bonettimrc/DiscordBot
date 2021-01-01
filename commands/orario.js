const { MessageAttachment } = require('discord.js')
module.exports = {
    name: 'orario',
    description: 'send current 4x schedule in chat',
    execute(message, args, otherArgs) {
        const attachment = new MessageAttachment(otherArgs.dirname + '\\media\\img\\');
        message.channel.send(attachment);
    }
}