function latexToImage(teXString) {
    return 'https://chart.googleapis.com/chart?cht=tx&chl=' + encodeURIComponent(teXString)
}
const { MessageEmbed } = require('discord.js')
const { MessageAttachment } = require("discord.js")
module.exports = {
    name: 'calcoletto',
    group: 'utilities',
    active: true,
    description: 'ex: ioana calcoletto <voltage> <voltageOffset> <frequency> <capacity> <resistence> <precision>',
    async execute(message, args, otherArgs) {
        args = args.map(arg => { return parseFloat(arg) })
        let voltage = args[0]
        let voltageOffset = args[1]
        let frequency = args[2]
        let capacity = args[3]
        let resistance = args[4]
        let precision = args[5]
        let pulsation = 2 * Math.PI * frequency
        let capacitiveReactance = -(1 / (pulsation * capacity))
        let impedenceModule = Math.sqrt(Math.pow(resistance, 2) + Math.pow(capacitiveReactance, 2))
        let impedenceArg = Math.atan(capacitiveReactance / resistance) * 180 / Math.PI
        let currentModule = voltage / impedenceModule
        let currentArg = voltageOffset - impedenceArg
        let capacitiveImpedence = Math.abs(capacitiveReactance)
        let capacitorVoltageModule = currentModule * capacitiveImpedence
        let capacitorVoltageArg = currentArg + 90
        let resistiveImpedence = Math.abs(resistance)
        let resistenceVoltageModule = currentModule * resistiveImpedence
        let resistenceVoltageArg = resistiveImpedence
        voltage = voltage.toPrecision(precision)
        voltageOffset = voltageOffset.toPrecision(precision)
        frequency = frequency.toPrecision(precision)
        capacity = capacity.toPrecision(precision)
        resistance = resistance.toPrecision(precision)
        precision = precision.toPrecision(precision)
        pulsation = pulsation.toPrecision(precision)
        capacitiveReactance = capacitiveReactance.toPrecision(precision)
        impedenceModule = impedenceModule.toPrecision(precision)
        impedenceArg = impedenceArg.toPrecision(precision)
        currentModule = currentModule.toPrecision(precision)
        currentArg = currentArg.toPrecision(precision)
        capacitiveImpedence = capacitiveImpedence.toPrecision(precision)
        capacitorVoltageModule = capacitorVoltageModule.toPrecision(precision)
        capacitorVoltageArg = capacitorVoltageArg.toPrecision(precision)
        resistiveImpedence = resistiveImpedence.toPrecision(precision)
        resistenceVoltageModule = resistenceVoltageModule.toPrecision(precision)
        resistenceVoltageArg = resistenceVoltageArg.toPrecision(precision)
        let lines = [
            `V_{in} = ${voltage}V \\angle ${voltageOffset}^{\\circ}`,
            `f = ${frequency}Hz`,
            `C = ${capacity}F`,
            `R = ${resistance}\\Omega`,
            `\\omega = 2\\pi f = 2\\pi ${frequency} = ${pulsation}Rad/s`,
            `X_{C} = -\\frac{1}{\\omega C} = -\\frac{1}{${pulsation} \\cdot ${capacity}} = ${capacitiveReactance} \\Omega`,
            `Z = R + jX_C = ${resistance} +j${capacitiveReactance} \\Omega`,
            `|Z|= \\sqrt{R^{2} + X_C^{2}} = \\sqrt{(${resistance})^{2} + (${capacitiveReactance})^{2}} = ${impedenceModule} \\Omega`,
            `\\angle Z = \\arctan (\\frac{X_C}{R}) = \\arctan (\\frac{${capacitiveReactance}}{${resistance}}) = ${impedenceArg}^{\\circ}`,
            `|I|=\\frac{|V|}{|Z|} = \\frac{${voltage}}{${impedenceModule}} = ${currentModule} A`,
            `\\angle I = \\angle V - \\angle Z = ${voltageOffset}-${impedenceArg} = ${currentArg}^{\\circ}`,
            `I = ${currentModule}A \\angle ${currentArg}^{\\circ}}`,
            `|Z_C| = |X_C| = |${capacitiveReactance}| = ${capacitiveImpedence}\\Omega`,
            `|V_C| = |I||Z_C| = ${currentModule}\\cdot${capacitiveImpedence} = ${capacitorVoltageModule}V`,
            `\\angle Z_C = 90^{\\circ}`,
            `\\angle V_C = \\angle I+\\angle Z_C = ${currentArg} + 90 = ${capacitorVoltageArg}`,
            `V_C = ${capacitorVoltageModule} V \\angle ${capacitorVoltageArg}`,
            `|Z_R| = |R| = |${resistance}| = ${resistiveImpedence}\\Omega`,
            `|V_R| = |I||Z_R| = ${currentModule}+${resistiveImpedence} = ${resistenceVoltageModule}`,
            `\\angle Z_R = 0`,
            `\\angle V_R = \\angle I+\\angle Z_R = ${currentArg} + 0 = ${resistenceVoltageArg}`,
            `V_R = ${resistenceVoltageModule} V \\angle ${resistenceVoltageArg}`
        ]
        const attchment = new MessageAttachment(`${otherArgs.dirname}\\media\\img\\rc.png`)
        await message.channel.send(attchment)
        for (let line of lines) {
            line = line.replace("--", "+")
            line = line.replace("+j-", "-j")
            const embed = new MessageEmbed()
                .setColor(0xbdbdbd)
                .setImage(latexToImage(line))
            await message.channel.send(embed)
        }

    }
}