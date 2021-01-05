const https = require('https');
module.exports = {
    name: 'skyjoke',
    group: 'inutilities',
    active: true,
    description: 'sends a dadjoke',
    execute(message, args) {
        const options = {
            host: 'icanhazdadjoke.com',
            headers: {
                'Accept': "application/json"
            }
        };
        https.request(options, (response) => {
            var str = '';

            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been received, so we just print it out here
            response.on('end', function () {
                dadjoke = JSON.parse(str).joke
                if (args[0] === "tts") { message.reply(dadjoke, { tts: true }) }
                else {
                    message.reply(dadjoke)
                }
            });
        }).end();

    }
}