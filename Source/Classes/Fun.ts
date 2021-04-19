import { Message, MessageEmbed } from "discord.js";

export default class Util {
	static randomNumber(start: number = 0, end: number = 1) {
		if(isNaN(start)) throw new TypeError("Start is not a Number");
		if(isNaN(end)) throw new TypeError("End is not a Number");

		return start + Math.floor(Math.random() * (end - start + 1));
	}

	static async coinFlip(message: Message, embed: boolean = false, embedColour: string = "GREEN") {
		if(typeof embed !== "boolean") throw new TypeError("Embed has to be a boolean!");

		if(typeof embedColour !== "string") throw new TypeError("EmbedColour has to be a string!");

		const bool = message.member?.hasPermission("ATTACH_FILES");

		let msg: Message;

		if(bool) {
			msg = await message.channel.send("https://cdn.discordapp.com/emojis/807106365369483294.gif?v=1");
		}

		setTimeout(() => {
			if(bool) msg.delete();

			const flipResponse = Math.random() > 0.5 ? "Heads" : "Tails";

			if(embed) {
				const FlipEmbed = new MessageEmbed()
					.setColor(embedColour)
					.setTitle("Coinflip Result")
					.setDescription(`<@!${message.author.id}>, your coin landed on ${flipResponse}!`);

				message.channel.send(FlipEmbed);
			}
			else {
				message.channel.send(`Your coin landed on ${flipResponse}!`);
			}
		}, 10000);
	}
};