module.exports = {
    name: 'stfu',
    group: 'audio',
    active: true,
    description: 'Makes the bot leave the voice channel',
    execute(message, args, otherArgs) {
        //WIP start
        const client = otherArgs.client
        let flag = false
        for (const [voiceChannelID, voiceChannel] of message.guild.channels.cache) {
            for (const [voiceConnectionID, voiceConnection] of client.voice.connections) {
                if (voiceConnection.channel.id === voiceChannel.id) {
                    voiceConnection.channel.leave()
                    flag = true
                }
            }
        }
        if (!flag) {
            message.reply("non sono in nessun canale ╥﹏╥")
        }
        //WIP end
    },
};
