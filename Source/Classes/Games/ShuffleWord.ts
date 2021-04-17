import wordList from "../../../Assets/JSON/word-list.json";
import { Message } from "discord.js";

export default class ShuffleWord {
	private words: string[] = wordList;
	private message: Message | undefined;
	private winMessage: string = "";
	private word: string = "";
	private count: number;
	private scrambledWord: string = "";

	constructor(message: Message, tryCount: number = 3, congratulatoryMessage: string = "Congratulations @MENTION! You won the game!", words?: string[]) {
		if(words && words.length > 0) this.words = words;
		if(!message) throw new Error("Message not provided!");

		this.message = message;

		if(typeof congratulatoryMessage !== "string") throw new TypeError("congratulatoryMessage is not of type: string!");

		this.winMessage = congratulatoryMessage;

		if(isNaN(tryCount)) throw new TypeError("tryCount is not a number");
		if(tryCount <= 0) throw new RangeError("tryCount can't be less than 0");

		this.count = Math.floor(tryCount);
	}

	async start() {
		this.word = this.words[Math.floor(Math.random() * this.words.length)];
		const arr = this.word.split("");

		for(let i = arr.length - 1; i > 0; i = i - 1) {
			const num = Math.floor(Math.random() * (i + 1));
			const char = arr[i];
			arr[i] = arr[num];
			arr[num] = char;
		}

		this.scrambledWord = arr.join("");

		await this.message?.channel.send(`The Shuffled Word is: \n\`${this.scrambledWord}\`\n To give up, type \`end\`, send your answer in the chat!\n **Tries Remaining: ${this.count}**\n You got 60 seconds`);

		// @ts-ignore
		const GameCollector = this.message?.channel.createMessageCollector((msg: Message) => msg.author.id === this.message?.author.id, { max: this.count, time: 60000 });

		GameCollector?.on("collect", (collected: Message) => {
			if(this.count === 0) {
				return this.message?.channel.send(`<@!${this.message.author}> Ayo, you lost the challenge!`);
			}

			this.count -= 1;

			const information = collected.content.toLowerCase();

			if(information === "end") {
				GameCollector.stop();
				return this.message?.channel.send(`I guess you give up! The answer was: ${this.word}`);
			}

			const bool = information === this.word.toLowerCase();

			if(bool) {
				GameCollector.stop();
				return this.message?.channel.send(this.winMessage.replace(/@MENTION/g, `<@!${this.message.author.id}>`));
			}

			if(this.count === 0) {
				return this.message?.channel.send(`<@!${this.message.author.id}> Ayo, you lost the challenge!`);
			}

			this.message?.channel.send(`That's wrong mate, try again! You got ${this.count} tries left`);
		});
	}
};