module.exports = {
	name: 'ping',
	group: 'utilities',
	active: true,
	description: 'pong!',
	execute(message) {
		message.channel.send('pong!');
	},
};