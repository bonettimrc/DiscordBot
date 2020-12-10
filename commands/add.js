const Blasphemator = require("../Blasphemator");
module.exports = {
	name: 'add',
	description: 'add blasphemy to database (example: ioana add dio cane)',
	execute(message, args, otherArgs) {
		Blasphemator.init()
		Blasphemator.updateEntities(args[0].toLowerCase())
		Blasphemator.updateDerogatories(args[1].toLowerCase())
	},
};