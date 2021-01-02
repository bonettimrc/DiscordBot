module.exports = {
	name: 'countdown',
	group: 'utilities',
	active: true,
	description: 'makes a countdown with tts. ex: ioana countdown <n>',
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
