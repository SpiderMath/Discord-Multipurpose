"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aki_api_ts_1 = require("aki-api.ts");
const common_tags_1 = require("common-tags");
const discord_js_1 = require("discord.js");
const DiscordUtil_1 = __importDefault(require("../DiscordUtil"));
class Akinator {
    constructor(message, region = "en", validReactions = ["✔", "❌"], akiEmojis = {
        yes: "👍",
        no: "👎",
        idk: "🤷",
        probably: "🤔",
        probablyNot: "🙄",
        previous: "👈",
    }) {
        this.count = 0;
        this.guessCount = 0;
        if (!message)
            throw new Error("message not provided!");
        if (!aki_api_ts_1.regions.includes(region.toLowerCase()))
            throw new TypeError(`Region has to be any of the following types: \n${aki_api_ts_1.regions.join(", ")}\n Received ${region} instead`);
        if (validReactions.length !== 2)
            throw new Error(`Expected length of validReactions to be 2, received ${validReactions.length}`);
        if (message.guild && !message.guild?.me?.hasPermission("ADD_REACTIONS"))
            throw new Error("Bot requires ADD_REACTIONS permission to use this module!");
        let childMode;
        // @ts-ignore
        if (message.guild)
            childMode = message.channel.nsfw;
        else
            childMode = false;
        // @ts-ignore
        this.region = region.toLowerCase();
        this.message = message;
        this.aki = new aki_api_ts_1.Aki(this.region, childMode);
        this.baseEmbed = () => {
            return new discord_js_1.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL() || message.author.defaultAvatarURL)
                .setTitle("Akinator");
        };
        this.validReactions = validReactions;
        this.AkiEmojis = akiEmojis;
    }
    async start() {
        this.msg = await this.message.channel.send(this
            .baseEmbed()
            .setColor("YELLOW")
            .setDescription("Are you sure that you want to start the game of Akinator?"));
        const confirmationBool = await DiscordUtil_1.default.confirmation(this.msg, this.message.author, this.validReactions);
        if (!confirmationBool) {
            return this.msg.edit(this
                .baseEmbed()
                .setColor("RED")
                .setDescription("Either the user did not respond, or the user declined the request"));
        }
        await this.msg.edit(this
            .baseEmbed()
            .setColor("GREEN")
            .setDescription("Request accepted, starting the game..."));
        await this.aki.start();
        await this.run();
    }
    async run() {
        this.count++;
        const emojiArr = Object.values(this.AkiEmojis);
        const emojiNameArr = emojiArr
            .map((str) => (str.length > 2) ? str.split(":")[1] : str);
        if (this.msg.embeds[0].description === "Request accepted, starting the game...") {
            await this.msg.delete();
            this.msg = await this.message.channel.send(this
                .baseEmbed()
                .setColor("GREEN")
                .addField(`Question ${this.count}`, this.aki.question)
                .addField("Answers", common_tags_1.stripIndents `
						Please react to this message to proceed
						${emojiArr.map(emoji => `${emoji}: ${this.aki.answers[emojiArr.indexOf(emoji)] || "Back"}`).join("\n")}
						Please wait for all the reactions to load to react
					`)
                .setFooter(`Progress: ${this.aki.progress}%`));
        }
        else {
            this.msg = await this.msg.edit(this
                .baseEmbed()
                .setColor("GREEN")
                .addField(`Question ${this.count}`, this.aki.question)
                .addField("Answers", common_tags_1.stripIndents `
						Please react to this message to proceed
						${emojiArr.map(emoji => `${emoji}: ${this.aki.answers[emojiArr.indexOf(emoji)] || "Back"}`).join("\n")}
					`)
                .setFooter(`Progress: ${this.aki.progress}%`));
        }
        if (this.count === 1) {
            for (const reaction of emojiArr)
                await this.msg.react(reaction);
        }
        const response = await this
            .msg
            .awaitReactions((reaction, user) => emojiNameArr.includes(reaction.emoji.name) && user.id === this.message.author.id, {
            max: 1,
            time: 60 * 1000,
        });
        if (!response.first())
            return this.message.channel.send("Game timed out");
        // @ts-ignore
        const id = emojiNameArr.indexOf(response.first()?.emoji.name);
        if (id === 5)
            await this.aki.back();
        else
            await this.aki.step(id);
        if (this.aki.progress >= 70 || this.aki.currentStep >= 78) {
            this.i = 0;
            await this.aki.win();
            return this.win();
        }
        this.run();
    }
    async win() {
        const answer = this.aki.answers[0];
        if (this.guessCount === 5) {
            return this
                .msg
                .edit(this
                .baseEmbed()
                .setColor("GREEN")
                .setDescription("You win! I could not guess your character!"));
        }
        this.msg = await this
            .message
            .channel
            .send(this
            .baseEmbed()
            .setColor("YELLOW")
            .setTitle(`Akinator Guess: ${this.guessCount + 1}`)
            .setDescription(common_tags_1.stripIndents `
							Is this the character you were thinking of?
							**Name**: ${answer.name}
							**Description**: ${answer.description}
						`)
            .setImage(answer.absolute_picture_path));
        for (const reaction of this.validReactions)
            await this.msg.react(reaction);
        const resp = await this.msg.awaitReactions((reaction, user) => this.validReactions.map((str) => str.length > 1 ? str.split(/:/g)[1] : str).includes(reaction.emoji.name) && user.id === this.message.author.id, {
            max: 1,
            time: 60 * 1000,
        });
        if (!resp.first()) {
            return this
                .msg
                .edit(this
                .baseEmbed()
                .setColor("GREEN")
                .setDescription("Since I received no response, I guess I win!"));
        }
        if (this.validReactions.map((str) => str.length > 1 ? str.split(/:/g)[1] : str)[0] === resp.first()?.emoji.name) {
            return this
                .msg
                .edit(this
                .baseEmbed()
                .setColor("GREEN")
                .setDescription("I guess I win again!"));
        }
        else {
            // eslint-disable-next-line
            if (this.guessCount === 5)
                this.win();
            else {
                this.guessCount++;
                this.run();
            }
        }
    }
}
exports.default = Akinator;
;
//# sourceMappingURL=Akinator.js.map