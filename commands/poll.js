const { MessageEmbed } = require('discord.js')
const QuickChart = require('quickchart-js');
module.exports = {
    name: 'poll',
    group: 'utilities',
    active: true,
    description: 'makes a poll \nex: ioana poll <question>-<answer1>-<answer2>-<answerN>.\n (the arguments must have an hyphen between them), if you\'re the author, type "endpoll" to end the poll, otherwise type "results" to see the results',
    async execute(message, args, otherArgs) {
        let string = ""
        for (arg of args) {
            string = string + " " + arg
        }
        const answers = string.split("-")
        const question = answers.shift()
        const pollAuthorID = message.author.id
        const emojis = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹"]
        const usersThatVoted = []
        if (answers > emojis.length) {
            message.reply(`limite massimo:${emojis.length} risposte`)
            return
        }
        let description = answers.map((a, i) => { return emojis[i] + " - " + a + "\n\n" }).join("")
        const embed = new MessageEmbed()
            .setColor(0xbdbdbd)
            .setTitle(question)
            .setDescription(description)
        const sent = await message.channel.send(embed)
        for (let i = 0; i < answers.length; i++) {
            sent.react(emojis[i])
        }
        const filter = (reaction, user) => {
            const condition = emojis.includes(reaction.emoji.name) && !usersThatVoted.includes(user.id) && !user.bot
            usersThatVoted.push(user.id)
            return condition
        };
        const collector = sent.createReactionCollector(filter, { time: 1 * 3600000 });
        collector.on('end', async (collected) => {
            //send poll results
            await processPollResults(collected)
        });
        async function onMessage(message_) {
            if (message_.channel !== message.channel) return
            const content = message_.content.toLowerCase().replace(" ", "")
            if (message_.author.id === pollAuthorID) {
                if (content === "endpoll") {
                    collector.stop()
                    otherArgs.client.removeListener('message', onMessage)
                }
                if (content === "results") {
                    await processPollResults(collector.collected)
                }
            }
        }
        otherArgs.client.on('message', onMessage)
        async function processPollResults(collected) {
            const chart = new QuickChart();
            chart
                .setConfig({
                    type: 'pie',
                    data: {
                        labels: collected.map(c => answers[emojis.indexOf(c.emoji.name)]),
                        datasets: [{
                            data: collected.map(c => c.me ? c.count - 1 : c.count)
                        }]
                    },
                })
                .setWidth(400)
                .setHeight(300)
            const embed = new MessageEmbed()
                .setColor(0xbdbdbd)
                .setTitle(question)
                .setImage(chart.getUrl())
            message.reply(embed)
        }

    }
}

