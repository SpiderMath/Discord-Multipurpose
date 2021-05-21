import { Message, MessageEmbed, MessageReaction, User } from "discord.js";

export default class DiscordUtil {
	/**
	 * @param msg The message object, which you get from the command
	 * @param pages An array of MessageEmbeds
	 * @param emojiList An array of left & right arrows
	 * @param timeout The time for which the pagination will be active (in miliseconds)
	 * @default emojiList ["⏪", "⏩"]
	 * @default timeout 120000
	 */
	static async paginateEmbed(msg: Message, pages: MessageEmbed[], emojiList: string[] = ["⏪", "⏩"], timeout: number = 120000) {
		// @ts-ignore
		if (!msg && !msg.channel) throw new Error("Channel is inaccessible.");
		if (!pages) throw new Error("Pages are not given.");
		if (emojiList.length !== 2) throw new Error("Need two emojis.");

		let page = 0;
		const curPage = await msg.channel.send(
			pages[page].setFooter(`Page ${page + 1} / ${pages.length}`),
		);
		for (const emoji of emojiList) await curPage.react(emoji);

		const reactionCollector = curPage.createReactionCollector(
			(reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
			{ time: timeout },
		);

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
	};

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
	static async confirmation(message: Message, author: User, validReactions: string[] = ["✔", "❌"], time: number = 60 * 1000, defaultResponse: boolean = false) {
		if(message.guild && !message.guild.me?.hasPermission("ADD_REACTIONS")) throw new Error("The bot needs to have the permission 'ADD_REACTIONS' to execute this function!");
		if(typeof defaultResponse !== "boolean") throw new TypeError(`Expected defaultResponse to be boolean, received ${typeof defaultResponse}`);

		if(validReactions.length !== 2) throw new Error(`Expected 2 emojis in array of validReactions, received ${validReactions.length}`);

		const names: string[] = [];

		validReactions
			.forEach(str => {
				if(str.trim().length > 1) { names.push(str.split(/:/g)[1]); }
				else { names.push(str.trim()); }
			});

		let result: boolean = defaultResponse;

		for(const reaction of validReactions) await message.react(reaction);

		const response = await message
			.awaitReactions((reaction: MessageReaction, user: User) => names.includes(reaction.emoji.name) && user.id === author.id, {
				max: 1,
				time,
			});

		if(response.first()) result = names[0] === response.first()?.emoji.name;

		return result;
	}
};