const { MessageAttachment } = require('discord.js')
module.exports = {
    name: 'orario',
    group: 'utilities',
    active: true,
    description: 'send current 4x schedule in chat',
    execute(message, args, otherArgs) {
        const attachment = new MessageAttachment(otherArgs.dirname + '\\media\\img\\orario.png');
        message.channel.send(attachment);
    }
}