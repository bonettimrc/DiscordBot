const say = require('say')
module.exports = {
    name: 'voices',
    description: 'gets a list of available voices',
    execute(message, args, otherArgs) {
        say.getInstalledVoices((err, voices) => {
            if (err) throw err
            message.reply(voices)
        })

    },
};