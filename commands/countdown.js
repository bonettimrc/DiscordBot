module.exports = {
	name: 'countdown',
	description: 'makes a countdown with text to speech (max 8)',
	execute(message, args) {
		let seconds = 3
		if (args[0]) {
			seconds = args[0]
		}
		let string = ""
		for (let i = seconds; i > 0; i--) {
			string += i.toString() + "..."
		}
		message.channel.send(string, { tts: true })
	},
};
