import { Aki, regions } from "aki-api.ts";
import { stripIndents } from "common-tags";
import { Message, MessageEmbed, MessageReaction, User } from "discord.js";
import DiscordUtil from "../DiscordUtil";

type Region = "en" | "en_objects" | "en_animals" | "ar"| "cn" | "de"| "de_animals"| "es" | "es_animals" | "fr" | "fr_objects" | "fr_animals" | "il" | "it" | "it_animals" | "jp" | "jp_animals" | "kr" | "nl" | "pl" | "pt" | "ru" | "tr" | "id";
interface AkiEmojis {
	yes?: string,
	no?: string,
	idk?: string,
	probably?: string,
	probablyNot?: string,
	previous?: string,
}

export default class Akinator {
	public region: Region;
	public message: Message;
	public aki: Aki;
	public baseEmbed: any;
	public validReactions: string[];
	// @ts-ignore
	public msg: Message;
	public AkiEmojis;
	// @ts-ignore
	public i: number;
	public count: number = 0;
	public guessCount: number = 0;

	public constructor(message: Message, region: Region = "en", validReactions: string[] = ["✔", "❌"], akiEmojis: AkiEmojis = {
		yes: "👍",
		no: "👎",
		idk: "🤷",
		probably: "🤔",
		probablyNot: "🙄",
		previous: "👈",
	}) {
		if(!message) throw new Error("message not provided!");
		if(!regions.includes(region.toLowerCase())) throw new TypeError(`Region has to be any of the following types: \n${regions.join(", ")}\n Received ${region} instead`);
		if(validReactions.length !== 2) throw new Error(`Expected length of validReactions to be 2, received ${validReactions.length}`);

		if(message.guild && !message.guild?.me?.hasPermission("ADD_REACTIONS")) throw new Error("Bot requires ADD_REACTIONS permission to use this module!");

		let childMode: boolean;
		// @ts-ignore
		if(message.guild) childMode = message.channel.nsfw;
		else childMode = false;

		// @ts-ignore
		this.region = region.toLowerCase();
		this.message = message;
		this.aki = new Aki(this.region, childMode);
		this.baseEmbed = () => {
			return new MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL() || message.author.defaultAvatarURL)
				.setTitle("Akinator");
		};
		this.validReactions = validReactions;
		this.AkiEmojis = akiEmojis;
	}

	public async start() {
		this.msg = await this.message.channel.send(
			this
				.baseEmbed()
				.setColor("YELLOW")
				.setDescription("Are you sure that you want to start the game of Akinator?"),
		);

		const confirmationBool = await DiscordUtil.confirmation(this.msg, this.message.author, this.validReactions);

		if(!confirmationBool) {
			return this.msg.edit(
				this
					.baseEmbed()
					.setColor("RED")
					.setDescription("Either the user did not respond, or the user declined the request"),
			);
		}

		await this.msg.edit(
			this
				.baseEmbed()
				.setColor("GREEN")
				.setDescription("Request accepted, starting the game..."),
		);

		await this.aki.start();

		await this.run();
	}

	private async run() {
		this.count++;
		const emojiArr = Object.values(this.AkiEmojis);
		const emojiNameArr = emojiArr
			.map((str: string) => (str.length > 2) ? str.split(":")[1] : str);

		if(this.msg.embeds[0].description === "Request accepted, starting the game...") {
			await this.msg.delete();

			this.msg = await this.message.channel.send(
				this
					.baseEmbed()
					.setColor("GREEN")
					.addField(`Question ${this.count}`, this.aki.question)
					.addField("Answers", stripIndents`
						Please react to this message to proceed
						${emojiArr.map(emoji => `${emoji}: ${this.aki.answers[emojiArr.indexOf(emoji)] || "Back"}`).join("\n")}
						Please wait for all the reactions to load to react
					`)
					.setFooter(`Progress: ${this.aki.progress}%`),
			);
		}
		else {
			this.msg = await this.msg.edit(
				this
					.baseEmbed()
					.setColor("GREEN")
					.addField(`Question ${this.count}`, this.aki.question)
					.addField("Answers", stripIndents`
						Please react to this message to proceed
						${emojiArr.map(emoji => `${emoji}: ${this.aki.answers[emojiArr.indexOf(emoji)] || "Back"}`).join("\n")}
					`)
					.setFooter(`Progress: ${this.aki.progress}%`),
			);
		}

		if(this.count === 1) {
			for(const reaction of emojiArr) await this.msg.react(reaction);
		}

		const response = await this
			.msg
			.awaitReactions(
				(reaction: MessageReaction, user: User) => emojiNameArr.includes(reaction.emoji.name) && user.id === this.message.author.id,
				{
					max: 1,
					time: 60 * 1000,
				},
			);

		if(!response.first()) return this.message.channel.send("Game timed out");

		// @ts-ignore
		const id = emojiNameArr.indexOf(response.first()?.emoji.name);

		if(id === 5) await this.aki.back();
		else await this.aki.step(id);

		if (this.aki.progress >= 70 || this.aki.currentStep >= 78) {
			this.i = 0;
			await this.aki.win();
			return this.win();
		}
		this.run();
	}

	private async win() {
		const answer = this.aki.answers[0];

		if(this.guessCount === 5) {
			return this
				.msg
				.edit(
					this
						.baseEmbed()
						.setColor("GREEN")
						.setDescription("You win! I could not guess your character!"),
				);
		}

		this.msg = await this
			.message
			.channel
			.send(
				this
					.baseEmbed()
					.setColor("YELLOW")
					.setTitle(`Akinator Guess: ${this.guessCount + 1}`)
					.setDescription(
						stripIndents`
							Is this the character you were thinking of?
							**Name**: ${answer.name}
							**Description**: ${answer.description}
						`,
					)
					.setImage(answer.absolute_picture_path),
			);

		for(const reaction of this.validReactions) await this.msg.react(reaction);

		const resp = await this.msg.awaitReactions(
			(reaction: MessageReaction, user: User) => this.validReactions.map((str) => str.length > 1 ? str.split(/:/g)[1] : str).includes(reaction.emoji.name) && user.id === this.message.author.id,
			{
				max: 1,
				time: 60 * 1000,
			},
		);

		if(!resp.first()) {
			return this
				.msg
				.edit(
					this
						.baseEmbed()
						.setColor("GREEN")
						.setDescription("Since I received no response, I guess I win!"),
				);
		}

		if(this.validReactions.map((str) => str.length > 1 ? str.split(/:/g)[1] : str)[0] === resp.first()?.emoji.name) {
			return this
				.msg
				.edit(
					this
						.baseEmbed()
						.setColor("GREEN")
						.setDescription("I guess I win again!"),
				);
		}
		else {
			// eslint-disable-next-line
			if(this.guessCount === 5) this.win();
			else {
				this.guessCount++;
				this.run();
			}
		}
	}
};
