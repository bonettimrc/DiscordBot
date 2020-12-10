const { MessageEmbed } = require('discord.js')
const Blasphemator = require('../Blasphemator')
module.exports = {
	name: 'leaderboard',
	description: 'display blasphemies by user',
	async execute(message) {
		const guild = message.guild
		Blasphemator.init()
		const usersById = Blasphemator.retrieveCounter(message.guild.id)
		let usersByName = []
		for (let userId in usersById) {
			const member = await guild.members.fetch(userId);
			usersByName.push([member.displayName, usersById[userId]])
		}
		usersByName.sort(function (a, b) {
			return b[1] - a[1];
		});
		let userNames = ""
		let blasphemies = ""
		for (let i = 0; i < usersByName.length; i++) {
			userNames += `\`${i + 1}\` ${usersByName[i][0]}\n`;
			blasphemies += `\`${usersByName[i][1]}\`\n`;
		}
		const embed = new MessageEmbed()
			.setColor(0xbdbdbd)
			.addFields(
				{ name: 'Nome', value: userNames, inline: true },
				{ name: 'Bestemmie', value: blasphemies, inline: true })
		message.reply(embed)

	},
};