const Blasphemator = require("../Blasphemator");
module.exports = {
	name: 'add',
	group: 'bestemmie',
	active: true,
	description: 'add blasphemy to database. ex: ioana add <deity> <derogatory>',
	execute(message, args) {
		Blasphemator.init()
		Blasphemator.updateEntities(args[0].toLowerCase())
		Blasphemator.updateDerogatories(args[1].toLowerCase())
	},
};