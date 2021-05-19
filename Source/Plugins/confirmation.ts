import { Message, User } from 'discord.js'

async function confirmation(message: Message, author: User, validReactions: any, time = 60000) {
    if (!message) throw new ReferenceError('"message" is not defined')
    if (!validReactions || validReactions.length !== 2) throw new ReferenceError('Incorrect form body of validReactions')
    if (typeof time !== "number") throw new SyntaxError('The type of "time" must be a number.')
    if (!message.guild?.me?.hasPermission("MANAGE_MESSAGES")) return console.log(`Discord Bot has to have "MANAGE_MESSAGES" permission.`)

    for (const reaction of validReactions) await message.react(reaction)

    const filter = (reaction: any, user: any) => validReactions.includes(reaction.emoji.name) && user.id === author.id

    return message
        .awaitReactions(filter, { max: 1, time: time })
        .then((collected: any) => collected.first() && collected.first().emoji.name);
}

export default confirmation;
