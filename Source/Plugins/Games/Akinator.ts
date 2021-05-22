import { Aki, regions } from "aki-api.ts";
import { Message, MessageEmbed } from "discord.js";

type Region = "en" | "en_objects" | "en_animals" | "ar"| "cn" | "de"| "de_animals"| "es" | "es_animals" | "fr" | "fr_objects" | "fr_animals" | "il" | "it" | "it_animals" | "jp" | "jp_animals" | "kr" | "nl" | "pl" | "pt" | "ru" | "tr" | "id";

export default class Akinator {
	public region: Region;
	public message: Message;
	public aki: Aki;

	public constructor(message: Message, region: Region = "en") {
		if(!message) throw new Error("message not provided!");
		if(!(message instanceof Message)) throw new TypeError("Invalid message object provided!");
		if(!regions.includes(region.toLowerCase())) throw new TypeError(`Region has to be any of the following types: \n${regions.join(", ")}\n Received ${region} instead`);

		let childMode: boolean;
		// @ts-ignore
		if(message.guild) childMode = message.channel.nsfw;
		else childMode = false;

		// @ts-ignore
		this.region = region.toLowerCase();
		this.message = message;
		this.aki = new Aki(this.region, childMode);
	}
};