import { Message, MessageEmbed } from "discord.js";
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
}
//# sourceMappingURL=DiscordUtil.d.ts.map