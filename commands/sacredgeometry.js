module.exports = {
    name: 'sacredgeometry',
    group: 'gdr',
    active: true,
    description: 'calculate the calculus needed to success a sacred geometry use. \nex: ioana sacredgeometry <lvl> <rolls>.\n the rolls are without spaces',
    execute(message, args, otherArgs) {
        const SacredGeometry = require(`${otherArgs.dirname}\\lib\\SacredGeometry`)
        message.reply(SacredGeometry.wizard(args[0], args[1], true))
    }
}