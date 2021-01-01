module.exports = {
    name: 'vaffanculo',
    description: 'enter voice channel and vaffanculo',
    execute(message, args, otherArgs) {
        const { voice } = message.member
        const audioPath = otherArgs.dirname + '\\media\\audio\\'
        if (!voice.channelID) {
            message.reply('Devi essere in un canale vocale per poter usare questo comando!');
            return
        }
        voice.channel.join().then((connection) => {
            connection.play(audioPath + "vaffanculo.mp3")
        })
    }

};