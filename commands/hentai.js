const NanaAPI = require("nana-api");
const nana = new NanaAPI();
module.exports = {
    name: 'hentai',
    description: 'sends random hentai',
    execute(message) {
        nana.random()
            .then(res => {
                message.reply('https://nhentai.net/g/' + res.id)
            })
    },
};