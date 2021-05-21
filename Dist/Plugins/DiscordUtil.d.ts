import { Message, MessageEmbed, User } from "discord.js";
export default class DiscordUtil {
    /**
     * @param msg The message object, which you get from the command
     * @param pages An array of MessageEmbeds
     * @param emojiList An array of left & right arrows
     * @param timeout The time for which the pagination will be active (in miliseconds)
     * @default emojiList ["⏪", "⏩"]
     * @default timeout 120000
     */
    static paginateEmbed(msg: Message, pages: MessageEmbed[], emojiList?: string[], timeout?: number): Promise<Message>;
    /**
     * @param message The message object, which you get from the command
     * @param author The user whose confirmation you want
     * @param validReactions The list of validReactions, validReactions[0] = accept & validReactions[1] = deny
     * @param time The time for which you want to wait (in ms)
     * @param defaultResponse The default response which you want when the user doesn't response [Boolean]
     * @default time 60*1000
     * @default validReactions ["✔", "❌"]
     * @default defaultResponse false
     */
    static confirmation(message: Message, author: User, validReactions?: string[], time?: number, defaultResponse?: boolean): Promise<boolean>;
}
//# sourceMappingURL=DiscordUtil.d.ts.map