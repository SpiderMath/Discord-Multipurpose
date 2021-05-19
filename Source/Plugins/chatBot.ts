import { Message } from 'discord.js'
import { default as axios } from 'axios'

async function chatBot(message: Message, input: string, uuid = 0o101) {
    if (!message)
        throw new ReferenceError('"message" is not defined');
    if (!input) throw new ReferenceError('"input" is not defined');
    axios.get(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(input)}&uid=${uuid}`).then((response) => {
        message.reply(response.data.response)
    })
}

export default chatBot;
