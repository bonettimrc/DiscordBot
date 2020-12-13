module.exports = {
	name: 'evoca',
	description: 'Serve per evocare una persona. es: ioana evoca <Nome della persona>',
	execute(message, args) {
		message.channel.send(args.toString() + " ti evoco", { tts: true })
	},
};