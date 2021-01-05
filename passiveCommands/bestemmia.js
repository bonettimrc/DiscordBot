
module.exports = {
    name: "bestemmia",
    execute(message, otherArgs) {
        const Blasphemator = require(`${otherArgs.dirname}\\Blasphemator`)
        Blasphemator.init();
        if (Blasphemator.blasphemyCheck(message.content)) {
            message.reply('nun se dice!');
            Blasphemator.processBlasphemy(message.guild.id, message.author.id);
        }
    },
};