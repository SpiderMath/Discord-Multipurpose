import { Aki, regions } from "aki-api.ts";
import { stripIndents } from "common-tags";
import { Message, MessageEmbed } from "discord.js";

type Region = "en" | "en_objects" | "en_animals" | "ar"| "cn" | "de"| "de_animals"| "es" | "es_animals" | "fr" | "fr_objects" | "fr_animals" | "il" | "it" | "it_animals" | "jp" | "jp_animals" | "kr" | "nl" | "pl" | "pt" | "ru" | "tr" | "id";

export default class Akinator {
	private aki: Aki;
	private message: Message;

	constructor(message: Message, region: Region = "en") {
		if(!regions.includes(region.toLowerCase())) throw new Error("The region is not valid!");

		// @ts-ignore
		if(message.guild && !message.channel.permissionsFor(message.client.user).has("EMBED_LINKS")) throw new Error("The bot needs 'EMBED_LINKS' permissions to execute this module");

		// @ts-ignore
		this.aki = new Aki(region, message.guild && message.channel.nsfw);
		this.message = message;
	}

	private async verify() {
		const yes = ["yes", "y", "ye", "yeah", "yep", "yup", "yea"];
		const no = ["no", "n", "nope", "nah", "never", "nop"];

		const verify = await this.message.channel.awaitMessages((res: Message) => res.author.id === this.message.author.id && (yes.includes(res.content.toLowerCase()) || no.includes(res.content.toLowerCase())), {
			max: 1,
			time :60 * 1000,
		});

		if(!verify.size) return 0;
		// @ts-ignore
		if(yes.includes(verify.first()?.content.toLowerCase())) return true;

		return false;
	}

	public async run() {
		let ans = null;
		let win = false;
		let timesGuessed = 0;
		let guessResetNum = 0;
		let wentBack = false;
		let forceGuess = false;
		const guessBlackList: string[] = [];

		while(timesGuessed < 3) {
			if(guessResetNum > 0) guessResetNum--;

			if(ans === null) {
				await this.aki.start();
			}
			else if(wentBack) {
				wentBack = false;
			}
			else {
				try { await this.aki.step(ans); }
				catch(err) { await this.aki.step(ans); }
			}

			if(!this.aki.answers || this.aki.currentStep >= 79) forceGuess = true;

			const answers = this.aki.answers.map((answer: string) => answer.toLowerCase());

			answers.push("end");
			if(this.aki.currentStep > 0) answers.push("back");

			await this.message.channel.send(
				new MessageEmbed()
					.setColor("YELLOW")
					.setAuthor(this.message.author.tag, this.message.author.displayAvatarURL() || this.message.author.defaultAvatarURL)
					.setTitle("Akinator")
					.addField(`Question ${this.aki.currentStep + 1}`, this.aki.question)
					.addField("Answers", `**${
						this.aki.answers.map((answer: string) => {
							if(answer.split(" ").length === 1) return `[${answer.split("")[0]}]${answer.slice(1)}`;
							return `[${answer.split(" ").map((str: string) => str.split("")[0]).join("").toUpperCase()}] ${answer}`;
						}).join(" | ")
					}${this.aki.currentStep > 0 ? " | [B]ack " : ""} | [E]nd**`),
			);

			const messages = await this.message.channel.awaitMessages((res: Message) => (res.author.id === this.message.author.id) && (answers.map(str => str.split("")[0].toLowerCase()).includes(res.content.toLowerCase())), {
				max: 1,
				time: 60 * 1000,
			});

			if(!messages.size) {
				await this.message.channel.send("The game has timed out due to inactivity");
				win = true;
				break;
			}
			const pick = messages.first()?.content.toLowerCase();

			if(pick === "e") {
				forceGuess = true;
			}
			else if(pick === "back") {
				wentBack = true;
				await this.aki.back();
				continue;
			}
			else {
				ans = answers.map(str => {
					if(str.split(" ").length === 1) return str.split("")[0].toLowerCase();
					return str.split(" ").map(s => s.split("")[0]).join("").toLowerCase();
				})
				// @ts-ignore
					.indexOf(pick);
			}

			if((this.aki.progress >= 90 && !guessResetNum) || forceGuess) {
				timesGuessed++;
				guessResetNum += 10;

				await this.aki.win();

				const guess = this.aki.answers.filter((g) => !guessBlackList.includes(g.id))[0];

				if(!guess) {
					this.message.channel.send("I cannot think of anyone... ");
					win = true;
					break;
				}

				guessBlackList.push(guess.id);

				await this.message.channel.send(
					new MessageEmbed()
						.setTitle(forceGuess ? "Final Guess" : `Guess Number: ${timesGuessed + 1}`)
						.setColor("RANDOM")
						.setAuthor(this.message.author.tag, this.message.author.displayAvatarURL())
						.setDescription(stripIndents`
							I am ${Math.round(guess.proba * 100)}% sure that your character is:
							**Name:** ${guess.name}
							${guess.description ? `**Description:** ${guess.description}` : ""}

							Please respond with [Y]es or [N]o to continue
						`)
						.setThumbnail(guess.absolute_picture_path || null),
				);

				const verification = await this.verify();

				if(verification === 0) {
					// @ts-ignore
					win = "time";
					break;
				}
				else if(verification) {
					win = false;
					break;
				}
				else {
					await this.message.channel.send(
						new MessageEmbed()
							.setColor("RED")
							.setAuthor(this.message.author.tag, this.message.author.displayAvatarURL() || this.message.author.defaultAvatarURL)
							.setTitle("Akinator")
							.setDescription(`🤔 Hmm, is that so? ${(forceGuess || timesGuessed >= 3) ? "I give up!" : "I can keep going!"}`),
					);

					if(timesGuessed >= 3 || forceGuess) {
						win = true;
						break;
					}
				}
			}
		}
		// @ts-ignore
		if(win === "time") return this.message.channel.send("Your silence has led me to the conclusion that I won");
		if(win) {
			return this.message.channel.send(
				new MessageEmbed()
					.setColor("GREEN")
					.setTitle("Akinator")
					.setTimestamp()
					.setDescription("You've defeated me this time"),
			);
		}

		return this.message.channel.send(
			new MessageEmbed()
				.setColor("GREEN")
				.setTitle("Akinator")
				.setTimestamp()
				.setDescription("This time, I win. Better luck next time!"),
		);
	}
};