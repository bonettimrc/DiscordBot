module.exports = {
    name: 'leave',
    group: 'music',
	description: 'Makes the bot leave the voice channel',
	execute(message, args) {
		const { voice } = message.member
        if (!voice.channelID) {
            message.reply('Devo essere in un canale vocale per poter uscire!');
            return
        }
        voice.channel.leave()
	},
};
