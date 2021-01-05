const { MessageAttachment } = require('discord.js')
module.exports = {
    name: "f",
    execute(message, otherArgs) {
        if (message.content === 'f') {
            const attachment = new MessageAttachment(`${otherArgs.dirname}\\media\\img\\F.png`);
            message.channel.send(attachment);
        }
    },
};