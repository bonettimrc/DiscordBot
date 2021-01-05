const GoogleImages = require('google-images');
const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'images',
	group: 'utilities',
	active: true,
	description: 'ex: ioana images <query>-<n>.\n query is the string to search, n is the page',
	execute(message, args) {
		//join all args into a string
		let string = ""
		for (arg of args) {
			string = string + " " + arg
		}
		string = string.split("-")
		const query = string[0]
		const page = string[1]
		const client = new GoogleImages(process.env.CSE_ID, process.env.GOOGLE_API_KEY);
		const options = { page: page, safe: "off" }
		client.search(query, options)
			.then(images => {
				for (const image of images) {
					const embed = new MessageEmbed()
						.setColor('0xbdbdbd')
						.setImage(image.url)
					message.channel.send(embed)
				}
			})
	},
};