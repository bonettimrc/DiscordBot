module.exports = {
	name: 'ping',
	description: 'pong!',
	execute(message) {
		message.channel.send('pong!');
	},
};