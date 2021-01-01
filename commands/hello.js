
module.exports = {
    name: 'hello',
    description: 'enter voice channel and greet',
    execute(message, args, otherArgs) {
        const voice = message.member.voice
        const audioPath = otherArgs.dirname + '\\media\\audio\\'
        if (!voice.channelID) {
            message.reply('Devi essere in un canale vocale per poter usare questo comando!');
            return
        }
        voice.channel.join().then((connection) => {
            connection.play(audioPath + "ciao.mp3")
        })

    },
};