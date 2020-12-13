module.exports = {
	name: 'summon',
	description: 'calls a person with tts. ex: ioana summon <person\'s name>',
	execute(message, args) {
		message.channel.send(args.toString() + " ti evoco", { tts: true })
	},
};