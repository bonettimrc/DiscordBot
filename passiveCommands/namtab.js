const discordTTS = require('discord-tts')
module.exports = {
    name: 'namtab',
    async execute(message, otherArgs) {
        if (message.content !== "namtab") return
        const voice = message.member.voice
        if (!voice.channelID) return
        const broadcast = otherArgs.client.voice.createBroadcast()
        voice.channel.join().then((connection) => {
            broadcast.play(discordTTS.getVoiceStream("ogaléicrum erbmoh le yos oi", "es-ES"));
            connection.play(broadcast);
        })
    }
}