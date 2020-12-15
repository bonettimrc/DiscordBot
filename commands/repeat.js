module.exports = {
	name: 'repeat',
	description: 'It repeats the message from the person who invoked the command.',
	execute(message, args) {
		let string = ""
		for (arg of args) {
			string = string.concat(arg)
		}
		message.channel.send(string, { tts: true })
	},
};