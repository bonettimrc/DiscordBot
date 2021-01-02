const say = require('say')
module.exports = {
    name: 'say',
    description: 'enters voice channel and tts\'s text',
    execute(message, args, otherArgs) {
        const voice = message.member.voice
        const audioPath = otherArgs.dirname + '\\media\\audio\\temp.mp3'
        if (!voice.channelID) {
            message.reply('Devi essere in un canale vocale per poter usare questo comando!');
            return
        }
        //join all args into a string
        let string = ""
        for (arg of args) {
            string = string + " " + arg
        }

        say.export(string, "Microsoft Elsa Desktop", null, audioPath, (err) => {
            if (err) throw err
            voice.channel.join().then((connection) => {
                connection.play(audioPath)
            })
        })

    },
};