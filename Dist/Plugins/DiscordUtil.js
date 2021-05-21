"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscordUtil {
    /**
     * @param msg The message object, which you get from the command
     * @param pages An array of MessageEmbeds
     * @param emojiList An array of left & right arrows
     * @param timeout The time for which the pagination will be active (in miliseconds)
     * @default emojiList ["⏪", "⏩"]
     * @default timeout 120000
     */
    static async paginateEmbed(msg, pages, emojiList = ["⏪", "⏩"], timeout = 120000) {
        // @ts-ignore
        if (!msg && !msg.channel)
            throw new Error("Channel is inaccessible.");
        if (!pages)
            throw new Error("Pages are not given.");
        if (emojiList.length !== 2)
            throw new Error("Need two emojis.");
        let page = 0;
        const curPage = await msg.channel.send(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
        for (const emoji of emojiList)
            await curPage.react(emoji);
        const reactionCollector = curPage.createReactionCollector((reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot, { time: timeout });
        reactionCollector.on("collect", (reaction) => {
            reaction.users.remove(msg.author);
            switch (reaction.emoji.name) {
                case emojiList[0]:
                    page = page > 0 ? --page : pages.length - 1;
                    break;
                case emojiList[1]:
                    page = page + 1 < pages.length ? ++page : 0;
                    break;
                default:
                    break;
            }
            curPage.edit(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
        });
        reactionCollector.on("end", () => {
            if (!curPage.deleted) {
                curPage.reactions.removeAll();
            }
        });
        return curPage;
    }
    ;
}
exports.default = DiscordUtil;
;
//# sourceMappingURL=DiscordUtil.js.map