const { MessageEmbed, MessageAttachment } = require('discord.js')
const GoogleChartsNode = require('google-charts-node');
module.exports = {
    name: 'poll',
    group: 'utilities',
    active: true,
    description: 'makes a poll \nex: ioana poll <question>-<answer1>-<answer2>-<answerN>.\n (the arguments must have an hyphen between them)',
    execute(message, args, otherArgs) {
        //join all args into a string
        let string = ""
        for (arg of args) {
            string = string + " " + arg
        }

        const symbols = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟"]
        const answers = string.split("-")
        const question = answers.shift()
        if (answers > symbols.length) {
            message.reply(`limite massimo:${symbols.length} risposte`)
            return
        }
        const pollAuthorID = message.author.id
        let description = ""
        for (let index = 0; index < answers.length; index++) {
            const answer = answers[index];
            description = description + symbols[index] + " - " + answer + "\n\n"
        }
        const embed = new MessageEmbed()
            .setColor(0xbdbdbd)
            .setTitle(question)
            .setDescription(description)
        message.channel.send(embed)
        const votes = {}

        const listener = async (message) => {
            if (message.content.toLowerCase() === "results") {

                const drawChart = `// Create the data table.
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Topping');
                data.addColumn('number', 'Slices');
                data.addRows(${JSON.stringify(formatAnswersVotes(answers, votes))});
                var options = {};
                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(data, options);
              `
                const image = await GoogleChartsNode.render(drawChart, {
                    width: 400,
                    height: 300,
                })
                const embed = new MessageEmbed()
                    .setColor(0xbdbdbd)
                    .setTitle(question)
                    .attachFiles(new MessageAttachment(image, "chart.png"))
                    .setImage("attachment://chart.png")
                message.reply(embed)
            }
            if (message.content.toLowerCase() === "endpoll") {
                if (message.author.id !== pollAuthorID) {
                    message.reply("devi essere l'autore della poll per terminarla")
                    return
                }
                otherArgs.client.removeListener('message', listener)
                const drawChart = `// Create the data table.
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Topping');
                data.addColumn('number', 'Slices');
                data.addRows(${JSON.stringify(formatAnswersVotes(answers, votes))});
                var options = {};
                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(data, options);
              `
                const image = await GoogleChartsNode.render(drawChart, {
                    width: 400,
                    height: 300,
                })
                const embed = new MessageEmbed()
                    .setColor(0xbdbdbd)
                    .setTitle(question)
                    .attachFiles(new MessageAttachment(image, "chart.png"))
                    .setImage("attachment://chart.png")
                message.reply(embed)
            }
            if (message.author.id in votes) return
            const vote = parseInt(message.content)
            if (isNaN(vote)) return
            if (vote < 0 || vote > answers.length) {
                message.reply("la risposta selezionata non esiste")
                return
            }
            votes[message.author.id] = vote
        }
        otherArgs.client.on('message', listener)
    }
}

function formatAnswersVotes(answers, votes) {
    const data = []
    for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        let currentAnswerVotes = 0
        for (const userID in votes) {
            if (votes[userID] === index) {
                currentAnswerVotes++
            }
        }
        data.push([answer, currentAnswerVotes])
    }
    return data
}