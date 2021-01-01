module.exports = {
    name: 'join',
    group: 'music',
	description: 'Makes the bot join the voice channel',
	execute(message, args) {
		const { voice } = message.member
        if (!voice.channelID) {
            message.reply('Devi essere in un canale vocale per poter usare questo comando!');
            return
        }
        voice.channel.join()
	},
};