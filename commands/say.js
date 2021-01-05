const discordTTS = require('discord-tts')
module.exports = {
    name: 'say',
    group: 'audio',
    active: true,
    description: 'enters voice channel and tts\'s text',
    async execute(message, args, otherArgs) {
        const voice = message.member.voice
        if (!voice.channelID) {
            message.reply('Devi essere in un canale vocale per poter usare questo comando!');
            return
        }
        //join all args into a string
        let string = ""
        for (arg of args) {
            string = string + " " + arg
        }
        if (string.length > 200) {
            message.reply("limite massimo:200 caratteri")
        } else if (string.length !== 0) {
            const broadcast = otherArgs.client.voice.createBroadcast()
            voice.channel.join().then((connection) => {
                broadcast.play(discordTTS.getVoiceStream(string, process.env.LANGUAGE));
                connection.play(broadcast);
            })
        }
    },
};