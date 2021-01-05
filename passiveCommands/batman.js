const discordTTS = require('discord-tts')
module.exports = {
    name: 'batman',
    async execute(message, otherArgs) {
        if (message.content !== "batman") return
        const voice = message.member.voice
        if (!voice.channelID) return
        const broadcast = otherArgs.client.voice.createBroadcast()
        voice.channel.join().then((connection) => {
            broadcast.play(discordTTS.getVoiceStream("io soy el hombre murciélago", "es-ES"));
            connection.play(broadcast);
        })
    }
}