module.exports = {
	name: 'repeat',
	description: 'It repeats the message from the person who invoked the command.',
	execute(message, args) {
		message.channel.send(args.toString(), { tts: true })
	},
};