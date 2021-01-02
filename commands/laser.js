const http = require('http')
module.exports = {
    name: 'laser',
    group: 'utilities',
    active: false,
    description: 'moves laser turret if on. ex: ioana laser <x> <y>',
    execute(message, args) {
        let data = { x: 90, y: 90, led: true }
        if (args[0]) {
            data.x = args[0]
        }
        if (args[1]) {
            data.y = args[1]
        }
        if (args[2]) {
            data.led = args[2]
        }

        const options = {
            hostname: 'vermepurpureo.ddns.net',
            port: 80,
            path: '/api',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(data).length
            },
        }

        const req = http.request(options)
        req.write(JSON.stringify(data))
        req.on('timeout', () => { message.reply("I'm sorry, the turret is not available") })
    },
};
