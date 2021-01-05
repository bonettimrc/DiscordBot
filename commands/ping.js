module.exports = {
	name: 'ping',
	group: 'inutilities',
	active: true,
	description: 'pong!',
	execute(message) {
		message.channel.send('pong!');
	},
};