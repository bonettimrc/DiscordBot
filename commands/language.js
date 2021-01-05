const discordTTS = require('discord-tts')
const { MessageEmbed } = require('discord.js')
const languages = ["af-ZA", "am-ET", "hy-AM", "az-AZ", "id-ID", "ms-MY", "bn-BD", "bn-IN", "ca-ES", "cs-CZ", "da-DK", "de-DE",
    "en-AU", "en-CA", "en-GH", "en-GB", "en-IN", "en-IE", "en-KE", "en-NZ", "en-NG", "en-PH", "en-SG", "en-ZA",
    "en-TZ", "en-US", "es-AR", "es-BO", "es-CL", "es-CO", "es-CR", "es-EC", "es-SV", "es-ES", "es-US", "es-GT",
    "es-HN", "es-MX", "es-NI", "es-PA", "es-PY", "es-PE", "es-PR", "es-DO", "es-UY", "es-VE", "eu-ES", "fil-PH",
    "fr-CA", "fr-FR", "gl-ES", "ka-GE", "gu-IN", "hr-HR", "zu-ZA", "is-IS", "it-IT", "jv-ID", "kn-IN", "km-KH",
    "lo-LA", "lv-LV", "lt-LT", "hu-HU", "ml-IN", "mr-IN", "nl-NL", "ne-NP", "nb-NO", "pl-PL", "pt-BR", "pt-PT",
    "ro-RO", "si-LK", "sk-SK", "sl-SI", "su-ID", "sw-TZ", "sw-KE", "fi-FI", "sv-SE", "ta-IN", "ta-SG", "ta-LK",
    "ta-MY", "te-IN", "vi-VN", "tr-TR", "ur-PK", "ur-IN", "el-GR", "bg-BG", "ru-RU", "sr-RS", "uk-UA", "he-IL",
    "ar-IL", "ar-JO", "ar-AE", "ar-BH", "ar-DZ", "ar-SA", "ar-IQ", "ar-KW", "ar-MA", "ar-TN", "ar-OM", "ar-PS",
    "ar-QA", "ar-LB", "ar-EG", "fa-IR", "hi-IN", "th-TH", "ko-KR", "zh-TW", "yue-Hant-HK", "ja-JP", "zh-HK", "zh"]
module.exports = {
    name: 'language',
    group: 'audio',
    active: true,
    description: 'if a language is passed, change language, otherwise list all languages',
    async execute(message, args, otherArgs) {
        const language = args[0]
        if (language) {
            if (languages.includes(language)) {
                process.env.LANGUAGE = language
            }
            else { message.reply("linguaggio non supportato") }
        }
        else {
            const embed = new MessageEmbed()
                .setColor(0xbdbdbd)
                .setDescription(languages.join("\n"))
            message.reply(embed)
        }
    },
};