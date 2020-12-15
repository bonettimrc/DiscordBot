module.exports = {
	name: 'summon',
	description: 'calls a person with tts. ex: ioana summon <person\'s name>',
	execute(message, args, otherArgs) {
		const summon = require(otherArgs.dirname + '\\commands\\repeat')
		args.push(", ti evoco")
		summon.execute(message, args)
	},
};