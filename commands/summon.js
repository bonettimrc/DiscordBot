module.exports = {
	name: 'summon',
	description: 'ex:ioana summon <@user>, writes to @user that you summoned him',
	execute(message, args, otherArgs) {
		if (message.mentions.users.first()) {
			message.mentions.users.first().send(`${message.author.username} ti ha evocato`)
		}
		if (message.mentions.roles.first()) {
			for (const [memberID, member] of message.mentions.roles.first().members) {
				member.user.send(`${message.author.username} ti ha evocato`)
			}
		}
	},
};